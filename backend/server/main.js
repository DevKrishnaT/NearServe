import express from "express";

import pool from "../dbconnection/db.js";
import admin from "firebase-admin";
import cors from "cors";
import fs from "fs";
import userRouter from "../routes/users/userRoutes.js";
import providerRouter from "../routes/provider/serviceRoutes.js";
import serviceRoutes from "../routes/service/seriviceConsumeRoutes.js";
import userSerices from "../routes/service/userServicesRoutes.js";
import checkForProvider from "../routes/provider/checkForProvider.js";
import userAddressRouter from "../routes/users/userAddress.js";

const serviceAccount = JSON.parse(
  fs.readFileSync("../serviceAccountKey/ServiceAccountKey.json", "utf-8"),
);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const allowedOrigins = [
  "http://localhost:5173",
  "https://near-serve-28yu.vercel.app",
  "http://192.168.1.33:5173",
];
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/api/user", userRouter);
app.use("/api/provider/list", providerRouter);
app.use("/api/provider/services", serviceRoutes);
app.use("/api/services", userSerices);
app.use("/api/isprovider", checkForProvider);
app.use("/api/user/address", userAddressRouter);

app.listen(4000, async () => {
  try {
    await pool.query("SELECT 1");

    console.log(" DB connected s");
    console.log(" Server running on http://localhost:4000");
  } catch (err) {
    console.error(" DB connection failed:", err.message);
    process.exit(1);
  }
});
