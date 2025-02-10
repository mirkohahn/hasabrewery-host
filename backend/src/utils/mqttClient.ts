import mqtt from "mqtt";

// Connect to MQTT broker
const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe("/receive/#");
  client.subscribe("/control/#");
});

client.on("message", (topic, message) => {
  console.log(`MQTT Message Received - Topic: ${topic}, Message: ${message.toString()}`);
});

// Export the MQTT client
export { client as mqttClient };
