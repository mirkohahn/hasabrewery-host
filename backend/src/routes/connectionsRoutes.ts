import express from "express";
import { getConnections, saveConnection, deleteConnection } from "../controllers/connectionsController";

const router = express.Router();

router.get("/", getConnections);
router.post("/", saveConnection);
router.delete("/:id", deleteConnection);

export default router;
