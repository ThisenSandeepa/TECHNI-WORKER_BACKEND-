const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "project-techni.appspot.com"
});

const db = admin.firestore();

module.exports = { admin, db };