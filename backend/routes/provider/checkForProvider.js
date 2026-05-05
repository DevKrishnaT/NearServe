import express from "express";
import pool from "../../dbconnection/db.js";
import admin from "firebase-admin";

const checkForProvider = express.Router();

checkForProvider.get("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;

    const [result] = await pool.query("SELECT * FROM users WHERE uid = ?", [
      uid,
    ]);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result[0];

   
    const isProvider = user.isProvider;

    if (isProvider) {
      return res.json({ isProvider: true });
    } else {
      return res.json({ isProvider: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
export default checkForProvider;