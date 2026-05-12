import express from "express";
import pool from "../../dbconnection/db.js";
import verifyToken from "../../middleman.js";

const getOrders = express.Router();

getOrders.get("/", verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;

    const [ordersResult] = await pool.query(
      `SELECT o.*
             FROM orders o
             JOIN users u ON o.user_id = u.id
             WHERE u.UID = ?`,
      [uid],
    );

    return res.status(200).json(ordersResult);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default getOrders;
