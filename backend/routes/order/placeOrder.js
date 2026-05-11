import express from "express";
import pool from "../../dbconnection/db.js";
import verifyToken from "../../middleman.js";

const useOrder = express.Router();

useOrder.post("/", verifyToken, async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const uid = req.user.uid;

    const [rows] = await connection.query("SELECT * FROM users WHERE uid = ?", [
      uid,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = rows[0];
    const userId = user.id;

    const { service, location } = req.body;

    if (
      !service?.service_id ||
      !location?.address ||
      !location?.lat ||
      !location?.lng
    ) {
      return res.status(400).json({
        error: "Required fields missing",
      });
    }

    const service_id = service.service_id;

    const [serviceRows] = await connection.query(
      "SELECT * FROM services WHERE id = ?",
      [service_id],
    );

    if (serviceRows.length === 0) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    const serviceData = serviceRows[0];

    const provider_id = serviceData.user_id;
    const title = serviceData.title;
    const total = serviceData.price;

    await connection.beginTransaction();

    const [addressResult] = await connection.query(
      `INSERT INTO addresses
      (
        user_id,
        label,
        full_address,
        city,
        state,
        pincode,
        latitude,
        longitude
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        location.label,
        location.address,
        location.city,
        location.state,
        location.pincode,
        location.lat,
        location.lng,
      ],
    );

    const addressId = addressResult.insertId;

    const addressSnapshot = JSON.stringify({
      label: location.label,
      address: location.address,
      city: location.city,
      state: location.state,
      pincode: location.pincode,
      latitude: location.lat,
      longitude: location.lng,
    });

    await connection.query(
      `INSERT INTO orders
      (
        user_id,
        provider_id,
        service_id,
        address_id,
        service_title,
        service_price,
        address_snapshot,
        subtotal,
        total
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        provider_id,
        service_id,
        addressId,
        title,
        total,
        addressSnapshot,
        total,
        total,
      ],
    );

    await connection.commit();

    return res.status(200).json({
      message: "Order successful",
    });
  } catch (error) {
    await connection.rollback();

    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  } finally {
    connection.release();
  }
});

export default useOrder;
