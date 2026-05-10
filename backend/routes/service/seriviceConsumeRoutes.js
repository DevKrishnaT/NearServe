import express from "express";
import pool from "../../dbconnection/db.js";
import admin from "firebase-admin";
import verifyToken from "../../middleman.js";

const serviceRoutes = express.Router();

serviceRoutes.get("/", verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;

    const [services] = await pool.query(
      `SELECT services.*, users.name 
       FROM services 
       JOIN users ON services.user_id = users.id 
       WHERE users.UID = ?`,
      [uid],
    );
    if (services.length === 0) {
      return res.status(404).json({ message: "no service found" });
    }
    console.log(services);
    res.status(200).json({ services });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

serviceRoutes.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const [rows] = await pool.query(
      `SELECT * FROM service_images WHERE service_id = ?`,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No images found" });
    }

    return res.status(200).json({ images: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

export default serviceRoutes;
