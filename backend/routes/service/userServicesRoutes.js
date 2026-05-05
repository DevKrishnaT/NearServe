import express from "express";
import { createClient } from "redis";
import pool from "../../dbconnection/db.js";

const userSerices = express.Router();

const redisClient = createClient();
await redisClient.connect();

userSerices.post("/", async (req, res) => {
  try {
    const { address } = req.body;
    const { latitude, longitude } = address;

    const lat = Number(latitude).toFixed(3);
    const lng = Number(longitude).toFixed(3);

    const cacheKey = `services:${lat}:${lng}`;

    let cachedData;

    try {
      cachedData = await redisClient.get(cacheKey);
    } catch (err) {
      console.log("Redis read error:", err.message);
    }

    if (cachedData) {
      console.log("CACHE HIT");
      return res.status(200).json({ services: JSON.parse(cachedData) });
    }

    console.log("CACHE MISS");

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

    if (services.length > 0) {
      try {
        await redisClient.setEx(cacheKey, 300, JSON.stringify(services));
      } catch (err) {
        console.log("Redis write error:", err.message);
      }
    }

    return res.status(200).json({ services });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default userSerices;
