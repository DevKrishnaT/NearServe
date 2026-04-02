import express from "express";
import pool from "../../dbconnection/db.js";
import admin from "firebase-admin";

const providerRouter = express.Router();

providerRouter.post("/", async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;
    const [row] = await pool.query("SELECT * FROM users WHERE uid = ?", [uid]);
    if (row.length === 0) {
      return res.status(404).json({ message: "user not found" });
    }

    const user = row[0];

    const userId = user.id;

    const {
      title,
      category,
      price,
      priceType,
      description,
      location,
      availability,
      experience,
      image,
    } = req.body;
    console.log(image);

    if (
      !title ||
      !price ||
      !location?.address ||
      !location?.lat ||
      !location?.lng
    ) {
      console.log(location);
      console.log(title, price, location.address, location.lat, location.lng);
      return res.status(400).json({ error: "Required fields missing" });
    }
    await connection.beginTransaction();

    const [addressResult] = await connection.query(
      `INSERT INTO addresses
      (user_id ,label , full_address, city , state , pincode , latitude , longitude)
      VALUES (? , ?,? , ? , ? , ? , ? , ?)`,
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

    const [serviceResult] = await connection.query(
      `INSERT INTO services
    (user_id , title , category , price , price_type, description , address_id , availability , experience )
    VALUES (? , ? , ? , ? , ? ,? , ? , ? ,?)`,
      [
        userId,
        title,
        category,
        price,
        priceType,
        description,
        addressId,
        availability,
        experience,
      ],
    );

    const serviceId = serviceResult.insertId;

    if (image && image.length > 0) {
      const imageValues = image.map((url) => [serviceId, url]);
      await connection.query(
        `INSERT INTO service_images (service_id, image_url) VALUES ?`,
        [imageValues],
      );
    }

    await connection.commit();
    res.status(201).json({
      message: "Service created successfully",
      serviceId,
    });
  } catch (error) {
    await connection.rollback();
    console.error(error);

    res.status(500).json({ error: "Server error" });
  } finally {
    connection.release();
  }
});

export default providerRouter;
