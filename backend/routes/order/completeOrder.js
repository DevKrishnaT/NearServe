import express from "express";
import pool from "../../dbconnection/db.js";
import verifyToken from "../../middleman.js";

const CompleteOrder = express.Router();

CompleteOrder.patch("/:orderId", verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const { orderId } = req.params;
    const [rows] = await pool.query("SELECT * FROM users WHERE uid = ?", [uid]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = rows[0];
    const userId = user.id;

    const [result] = await pool.query(
      `UPDATE orders
            SET status = 'completed'
            WHERE id = ?
            AND provider_id = ?
            AND status = 'in_progress'
            `,
      [orderId, userId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found or already Completed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order Completed successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
export default CompleteOrder;