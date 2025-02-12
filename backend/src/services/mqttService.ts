import mqtt, { MqttClient } from "mqtt";
import fs from "fs";
import path from "path";

const MQTT_BROKER_URL = "mqtt://192.168.0.56:1883"; 
const LOG_FILE_PATH = path.join(__dirname, "../logs/mqtt_logs.json");
let mqttClient: MqttClient;

const mqttService = {
  init: () => {
    mqttClient = mqtt.connect(MQTT_BROKER_URL);
    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker. Connected to: ", MQTT_BROKER_URL);
      mqttClient.subscribe("receive/#");
      mqttClient.subscribe("/receive/#");
      mqttClient.subscribe("control/#");
      mqttClient.subscribe("/control/#");
    });

    mqttClient.on("message", (topic, message) => {
      const logEntry = {
        timestamp: new Date().toISOString(),
        topic,
        message: message.toString(),
      };
      console.log("MQTT Message:", logEntry);
      mqttService.logMessage(logEntry);
    });
  },

  logMessage: (entry: object) => {
    const logs = fs.existsSync(LOG_FILE_PATH)
      ? JSON.parse(fs.readFileSync(LOG_FILE_PATH, "utf-8"))
      : [];
    logs.push(entry);
    fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(logs, null, 2));
  },

  getLogs: () => {
    return fs.existsSync(LOG_FILE_PATH)
      ? JSON.parse(fs.readFileSync(LOG_FILE_PATH, "utf-8"))
      : [];
  },
};

export default mqttService;
