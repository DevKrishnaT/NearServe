import express from "express";
import pool from "../../dbconnection/db.js";
import admin from "firebase-admin";

const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;

    const [rows] = await pool.query("SELECT * FROM users WHERE uid = ?", [uid]);

    if (rows.length > 0) {
      return res.json({
        message: "User already exists",
        user: rows[0],
      });
    }

    const { name, phoneNo } = req.body;

    await pool.query(
      "INSERT INTO users (uid, name, phoneNo) VALUES (?, ?, ?)",
      [uid, name, phoneNo],
    );

    res.json({ message: "User created" });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

userRouter.patch("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const { name } = req.body;

    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;

    const [result] = await pool.query("SELECT * FROM users WHERE uid = ?", [
      uid,
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    await pool.query("UPDATE users SET name = ? WHERE uid = ?", [name, uid]);

    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.error(error);
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;

    const [result] = await pool.query("SELECT * FROM users WHERE uid = ?", [
      uid,
    ]);

    if (result.length === 0) {
      return res.json({ message: "No user exists" });
    }

    res.json({
      message: "User found",
      user: result[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default userRouter;
