import express from "express";
import pool from "../../dbconnection/db.js";
import verifyToken from "../../middleman.js";

const acceptOrder = express.Router();

acceptOrder.patch("/:orderId", verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const { orderId } = req.params;
    const [rows] = await pool.query("SELECT * FROM users WHERE uid = ?", [
      uid,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = rows[0];
    const userId = user.id;


    const [result] = await pool.query(
      `UPDATE orders
            SET status = 'accepted'
            WHERE id = ?
            AND provider_id = ?
            AND status = 'pending'
            `,
      [orderId, userId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found or already accepted",
      });
    }

    

    return res.status(200).json({
      success: true,
      message: "Order accepted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
export default acceptOrder;
