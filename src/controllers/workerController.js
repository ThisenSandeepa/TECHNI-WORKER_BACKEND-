const { db } = require("../config/firebase");
const { uploadToFirebase } = require("../services/storageService");
const { ApiError } = require("../middleware/errorHandler");

exports.createProfile = async (req, res, next) => {
  try {
    const uid = req.user.uid;
    
    if (!req.body.name || !req.body.category) {
      return res.status(400).json({ 
        success: false,
        error: 'Name and category are required' 
      });
    }

    const data = {
      uid,
      name: req.body.name,
      phone: req.user.phone_number,
      category: req.body.category,
      createdAt: new Date(),
    };

    await db.collection("workers").doc(uid).set(data);

    res.json({ 
      success: true,
      message: "Profile created successfully",
      data 
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const uid = req.user.uid;

    const doc = await db.collection("workers").doc(uid).get();

    if (!doc.exists) {
      return res.status(404).json({ 
        success: false,
        error: 'Profile not found' 
      });
    }

    res.json({ 
      success: true,
      data: doc.data() 
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

exports.uploadProfileImage = async (req, res, next) => {
  try {
    const uid = req.user.uid;

    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No file provided' 
      });
    }

    const imageUrl = await uploadToFirebase(req.file);

    await db.collection("workers").doc(uid).update({
      profileImage: imageUrl,
      updatedAt: new Date(),
    });

    res.json({ 
      success: true,
      message: 'Profile image uploaded successfully',
      imageUrl 
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

exports.uploadNIC = async (req, res, next) => {
  try {
    const uid = req.user.uid;
    const side = req.body.side === 'back' ? 'back' : 'front';

    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No file provided' 
      });
    }

    const fileUrl = await uploadToFirebase(req.file);

    const updateData = {
      updatedAt: new Date(),
    };

    if (side === 'front') {
      updateData.nicFrontImage = fileUrl;
      updateData.nicImage = fileUrl;
    } else {
      updateData.nicBackImage = fileUrl;
    }

    await db.collection("workers").doc(uid).update(updateData);

    res.json({ 
      success: true,
      message: side === 'front' ? 'NIC front image uploaded successfully' : 'NIC back image uploaded successfully',
      side,
      fileUrl 
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};