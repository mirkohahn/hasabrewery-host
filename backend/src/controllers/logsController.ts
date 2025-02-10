import { Request, Response } from "express";
import mqttService from "../services/mqttService";

export const getMqttLogs = (req: Request, res: Response) => {
  res.json(mqttService.getLogs());
};
