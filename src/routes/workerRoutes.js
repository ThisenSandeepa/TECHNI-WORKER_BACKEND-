const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const workerController = require("../controllers/workerController");
const upload = require("../middleware/uploadMiddleware");

// Worker profile management
router.post("/profile", verifyToken, workerController.createProfile);
router.get("/profile", verifyToken, workerController.getProfile);
router.get("/me", verifyToken, workerController.getProfile);
router.patch("/nic-number", verifyToken, workerController.updateNICNumber);

// File uploads
router.post("/document", verifyToken, upload.single("document"), workerController.uploadDocument);
router.post("/profile-image", verifyToken, upload.single("image"), workerController.uploadProfileImage);
router.post("/nic-image", verifyToken, upload.single("image"), workerController.uploadNIC);

module.exports = router;