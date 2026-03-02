const { bucket } = require("../config/firebase");
const path = require("path");
const fs = require("fs");

const uploadToFirebase = async (file) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    const fileName = `${Date.now()}-${path.basename(file.originalname)}`;
    const fileUpload = bucket.file(fileName);

    const fileData = fs.readFileSync(file.path);
    
    await fileUpload.save(fileData, {
      metadata: {
        contentType: file.mimetype,
      },
    });

    await fileUpload.makePublic();

    // Clean up temporary file
    fs.unlinkSync(file.path);

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    return publicUrl;
  } catch (error) {
    // Clean up temporary file on error
    if (file && file.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};

module.exports = { uploadToFirebase };