import pool from "../../dbconnection/db.js";
import express from "express";
import admin from "firebase-admin";
import verifyToken from "../../middleman.js";

const userAddressRouter = express.Router();

userAddressRouter.get("/", verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const [addresses] = await pool.query(
      `SELECT a.* 
       FROM addresses a 
       JOIN users u ON a.user_id = u.id 
       WHERE u.UID = ?`,
      [uid],
    );
    console.log(addresses);

    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching addresses" });
  }
});

userAddressRouter.delete("/:id", verifyToken, async (req, res) => {
  try {
    const uid = req.user.uid;
    const addressId = req.params.id;

    const [result] = await pool.query(
      `DELETE a FROM addresses a 
       JOIN users u ON a.user_id = u.id 
       WHERE a.id = ? AND u.UID = ?`,
      [addressId, uid],
    );
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting address" });
  }
});

export default userAddressRouter;
