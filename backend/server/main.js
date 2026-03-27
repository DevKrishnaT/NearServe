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
  "http://192.168.1.33:5173",
];
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
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

app.patch("/api/user", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    const { name } = req.body;
    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;
    const [result] = await pool.query("SELECT * FROM users WHERE uid = ?", [
      uid,
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "user dint find" });
    }

    const [edit] = await pool.query("UPDATE users SET name = ? WHERE uid = ?", [
      name,
      uid,
    ]);

    if (edit.affectedRows === 0) {
      return res.status(401).json({ message: " try again" });
    } else {
      return res.status(200).json({ message: "Updated successfully" });
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/api/user/services", async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = await admin.auth().verifyIdToken(token);
    const userId = decoded.uid;
    const {
      title,
      category,
      price,
      priceType,
      description,
      location,
      avalibilty,
      experience,
      img,
    } = req.body;

    if (
      !title ||
      !price ||
      !location?.address ||
      !location?.lat ||
      !location?.lng
    ) {
      return res.status(400).json({ error: "Required fields missing" });
    }
    await connection.beginTransaction();

    const [addressResult] = await connection.query(
      `INSERT INTO addresses
      (user_id , full_adress, city , state , pincode , latitude , longitude)
      VALUES (? , ? , ? , ? , ? , ? , ?)`,
      [
        userId,
        location.address,
        location.city,
        location.state,
        location.pincode,
        location.lat,
        location.lng,
      ],
    );
    const addressId = addressResult.insertId;

    const [serviceResult] = await connection.query(
      `INSERT INTO services
    (user_id , title , category , price , price_type, description , address_id , availability , experience )
    VALUES(? , ? , ? , ? , ? ,? , ? , ? ,?)`,
    )[
      (userId,
      title,
      category,
      price,
      priceType,
      description,
      addressId,
      avalibilty,
      experience)
    ];

    const serviceId = serviceResult.insertId;

    if (img && img.length > 0) {
      const imageValues = img.map((url) => [serviceId, url]);
      await connection.query(
        `INSERT INTO service_images (service_id, image_url) VALUES ?`,
        [imageValues],
      );
    }

    await connection.commit();
    res.status(201).json({
      message: "Service created successfully",
      serviceId,
    });
  } catch (error) {
    await connection.rollback();
    console.error(error);

    res.status(500).json({ error: "Server error" });
  } finally {
    connection.release();
  }
});
app.get("/api/user", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;

    const [result] = await pool.query("SELECT * FROM users WHERE uid = ?", [
      uid,
    ]);

    if (result.length === 0) {
      return res.json({ message: "No user exists" });
    }

    return res.json({
      message: "User found",
      user: result[0],
    });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ error: error.message });
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
