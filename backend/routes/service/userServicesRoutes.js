import express from "express";
import pool from "../../dbconnection/db.js";


const userSerices = express.Router();

userSerices.get("/", async (req, res) => {
  try {
    const [services] = await pool.query(`SELECT * FROM services`);

    return res.status(200).json({ services: services });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

export default userSerices;
