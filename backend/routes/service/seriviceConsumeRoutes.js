import express from "express";
import pool from "../../dbconnection/db.js";
import admin from "firebase-admin";

const serviceRoutes = express.Router();

serviceRoutes.get("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;
   
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

export default serviceRoutes;
