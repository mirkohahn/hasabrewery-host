import fs from "fs";
import path from "path";
import { Request, Response } from "express";

const connectionsPath = path.join(__dirname, "../data/current_connections.json");

export const getConnections = (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(connectionsPath, "utf-8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ message: "Failed to read connections." });
  }
};

export const saveConnection = (req: Request, res: Response) => {
  try {
    const newConnection = req.body;
    const data = JSON.parse(fs.readFileSync(connectionsPath, "utf-8"));
    data.push(newConnection);
    fs.writeFileSync(connectionsPath, JSON.stringify(data, null, 2));
    res.status(201).json({ message: "Connection saved successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to save connection." });
  }
};

export const deleteConnection = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = JSON.parse(fs.readFileSync(connectionsPath, "utf-8"));
    const updatedData = data.filter((conn: any) => conn.id !== id);
    fs.writeFileSync(connectionsPath, JSON.stringify(updatedData, null, 2));
    res.status(200).json({ message: "Connection deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete connection." });
  }
};
