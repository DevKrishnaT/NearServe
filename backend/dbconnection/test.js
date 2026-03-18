import pool from "./db.js";

async function checkDB() {
  try {
    const [rows] = await pool.query("SELECT DATABASE() as db");

    console.log("✅ Connected to DB:", rows[0].db);

  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  }
}

checkDB();