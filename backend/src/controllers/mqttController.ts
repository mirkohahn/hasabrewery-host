import { mqttClient } from "../mqttClient";
import { Request, Response } from "express";

export const publishMessage = (req: Request, res: Response) => {
  try {
    const { topic, message } = req.body;
    mqttClient.publish(topic, JSON.stringify(message), { qos: 1 }, (err) => {
      if (err) {
        res.status(500).json({ message: "Failed to publish message." });
      } else {
        res.status(200).json({ message: "Message published successfully." });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error publishing message." });
  }
};
