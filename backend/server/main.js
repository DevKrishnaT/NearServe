import express from "express";

import pool from "../dbconnection/db.js";
import admin from "firebase-admin";
import cors from "cors";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync("../serviceAccountKey/ServiceAccountKey.json", "utf-8"),
);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const allowedOrigins = [
  "http://localhost:5173",
  "https://near-serve-28yu.vercel.app",
];
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
app.post("/api/user", async (req, res) => {
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

    const [result] = await pool.query(
      "INSERT INTO users (uid, name, phoneNo) VALUES (?, ?, ?)",
      [uid, name, phoneNo],
    );

    res.json({ message: "User created" });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.listen(4000, async () => {
  try {
    await pool.query("SELECT 1");

    console.log("✅ DB connected");
    console.log("🚀 Server running on http://localhost:4000");
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  }
});
