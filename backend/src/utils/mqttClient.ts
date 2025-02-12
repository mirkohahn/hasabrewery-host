import mqtt, { MqttClient } from "mqtt";
import fs from "fs";
import path from "path";

const MQTT_BROKER_URL = "mqtt://192.168.0.56:1883"; 
const LOG_FILE_PATH = path.resolve(__dirname, "../logs/mqtt_logs.json");

// Ensure log file exists
if (!fs.existsSync(LOG_FILE_PATH)) {
  fs.writeFileSync(LOG_FILE_PATH, JSON.stringify([], null, 2));
}

const mqttClient: MqttClient = mqtt.connect(MQTT_BROKER_URL);

mqttClient.on("connect", () => {
  console.log("✅ Connected to MQTT broker");

  mqttClient.subscribe("receive/#", (err) => {
    if (err) console.error("❌ Failed to subscribe to receive/#", err);
    else console.log("✅ Subscribed to receive/#");
  });

  mqttClient.subscribe("/control/#", (err) => {
    if (err) console.error("❌ Failed to subscribe to control/#", err);
    else console.log("✅ Subscribed to control/#");
  });
});

mqttClient.on("message", (topic, message) => {
  const timestamp = new Date().toISOString();
  const logEntry = { timestamp, topic, message: message.toString() };

  console.log("📩 MQTT Message:", logEntry);

  try {
    // Read current logs
    const logs = fs.existsSync(LOG_FILE_PATH) ? JSON.parse(fs.readFileSync(LOG_FILE_PATH, "utf-8")) : [];
    logs.push(logEntry);

    // Write updated logs
    fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error("❌ Error writing log file:", error);
  }
});

mqttClient.on("error", (error) => console.error("❌ MQTT Connection Error:", error));

export default mqttClient;
