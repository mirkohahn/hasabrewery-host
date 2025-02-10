import express from "express";
import { readLogs } from "../utils/fileUtils";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const logs = readLogs();
    res.json(logs);
  } catch (err) {
    console.error("❌ Error fetching logs:", err);
    res.status(500).json({ error: "Could not read logs" });
  }
});

export default router;
