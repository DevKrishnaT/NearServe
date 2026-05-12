import express from "express";
import pool from "../../dbconnection/db.js";
import verifyToken from "../../middleman.js";

const getOrdersProviders = express.Router();

getOrdersProviders.get("/", verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const [ordersResult] = await pool.query(
      `SELECT o.*
             FROM orders o
             JOIN users u ON o.provider_id = u.id
             WHERE u.UID = ?`,
      [uid],
    );
    res.json(ordersResult);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default getOrdersProviders;
