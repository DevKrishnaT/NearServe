import express from "express";
import pool from "../../dbconnection/db.js";

const userSerices = express.Router();

userSerices.post("/", async (req, res) => {
  try {
    const { address } = req.body;

    const { latitude, longitude } = address;

    const [services] = await pool.query(
      `SELECT s.*,
      ST_Distance_Sphere(
      POINT (a.longitude , a.latitude),
      POINT (? , ?)
      ) AS distance
       FROM services s 
       JOIN addresses a ON s.address_id = a.id 
       HAVING distance <= 10 * 1000
       ORDER BY distance`,
      [longitude, latitude],
    );

    return res.status(200).json({ services });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default userSerices;
