import express from "express";
import { Redis } from "@upstash/redis";
import pool from "../../dbconnection/db.js";

console.log("URL =", process.env.UPSTASH_REDIS_REST_URL);
console.log("TOKEN =", process.env.UPSTASH_REDIS_REST_TOKEN);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
const userSerices = express.Router();

userSerices.post("/", async (req, res) => {
  try {
    const { address } = req.body;
    const { latitude, longitude } = address;

    const lat = Number(latitude).toFixed(3);
    const lng = Number(longitude).toFixed(3);

    const cacheKey = `services:${lat}:${lng}`;

    let cachedData;

    try {
      cachedData = await redis.get(cacheKey);
    } catch (err) {
      console.log("Redis read error:", err.message);
    }

    if (cachedData) {
      console.log("CACHE HIT");
      return res.status(200).json({ services: cachedData });
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
        await redis.set(cacheKey, services, {
          ex: 300,
        });
      } catch (err) {
        console.log("Redis write error:", err.message);
      }
    }

    return res.status(200).json({ services });
  } catch (error) {
    console.error("FULL ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
});
userSerices.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [service] = await pool.query("SELECT * FROM services WHERE id = ?", [
      id,
    ]);

    if (!service.length) {
      return res.status(404).json({
        message: "Service not found",
      });
    }
    res.status(200).json(service[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default userSerices;
