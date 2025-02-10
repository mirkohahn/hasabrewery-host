import mqtt from "mqtt";
import fs from "fs";
import path from "path";

const logPath = path.join(__dirname, "../logs/mqtt.log");

export const mqttClient = mqtt.connect("mqtt://mqtt_host:1883");

mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker.");
  mqttClient.subscribe("/receive/#");
});

mqttClient.on("message", (topic, message) => {
  const logEntry = `${new Date().toISOString()} - ${topic} - ${message.toString()}\n`;
  fs.appendFileSync(logPath, logEntry);
});
