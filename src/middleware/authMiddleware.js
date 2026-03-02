const { admin } = require("../config/firebase");
const { ApiError } = require("./errorHandler");

const verifyToken = async (req, res, next) => {
  try {
    const allowDevBypass =
      process.env.ALLOW_DEV_AUTH_BYPASS === "true" &&
      (process.env.NODE_ENV || "development") !== "production";

    if (allowDevBypass) {
      const testUid = req.headers["x-test-uid"] || "postman-test-user";
      req.user = {
        uid: String(testUid),
        phone_number: req.headers["x-test-phone"] || null,
      };
      return next();
    }

    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        success: false,
        error: 'Missing authorization header' 
      });
    }

    const token = authHeader.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid token format' 
      });
    }

    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ 
      success: false,
      error: 'Invalid or expired token' 
    });
  }
};

module.exports = verifyToken;