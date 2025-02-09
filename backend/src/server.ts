import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mqtt from "mqtt";
import path from "path";

// Load environment variables from the **root** .env file
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use environment variables from .env instead of hardcoding
const PORT = process.env.BACKEND_PORT || 9110;
const MQTT_BROKER = process.env.MQTT_BROKER_HOST || "localhost";
const MQTT_PORT = process.env.MQTT_BROKER_PORT || "1883";

// 🔗 Connect to MQTT Broker using env variables
const mqttClient = mqtt.connect(`mqtt://${MQTT_BROKER}:${MQTT_PORT}`);

mqttClient.on("connect", () => {
  console.log(`✅ Connected to MQTT Broker at ${MQTT_BROKER}:${MQTT_PORT}`);
  mqttClient.subscribe("brewery/#", (err) => {
    if (err) {
      console.error("❌ Failed to subscribe to MQTT topic:", err);
    } else {
      console.log("📡 Subscribed to topic: brewery/#");
    }
  });
});

// 📩 Handle incoming MQTT messages
mqttClient.on("message", (topic, message) => {
  console.log(`📩 Received message on ${topic}: ${message.toString()}`);
});

// 🔍 Health Check API Route
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// 📤 Publish MQTT Message API
app.post("/publish", (req, res) => {
  const { topic, message } = req.body;

  if (!topic || !message) {
    return res.status(400).json({ error: "Topic and message are required" });
  }

  mqttClient.publish(topic, message, (err?: Error) => {

    if (err) {
      console.error("❌ Failed to publish MQTT message:", err);
      return res.status(500).json({ error: "Failed to publish message" });
    }
    console.log(`📤 Published message: ${message} to topic: ${topic}`);
    res.json({ success: true, topic, message });
  });
});

// 🚀 Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
