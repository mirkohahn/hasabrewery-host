import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Devices API is working!" });
});

export default router;
