import express from "express";
import { publishMessage } from "../controllers/mqttController";

const router = express.Router();

router.post("/publish", publishMessage);

export default router;
