import mqtt from "mqtt";
import { logMessageToFile } from "./utils/fileUtils";

const MQTT_BROKER_URL = "mqtt://localhost"; // Replace with your MQTT broker URL
const LOG_FILE_PATH = "./src/logs/mqtt.log";

let client: mqtt.MqttClient;

/**
 * Connects to the MQTT broker.
 */
export const connectToMqttBroker = () => {
  try {
    client = mqtt.connect(MQTT_BROKER_URL);

    client.on("connect", () => {
      console.log("Connected to MQTT broker.");
      client.subscribe("/receive/#", (err) => {
        if (err) {
          console.error("Failed to subscribe to /receive/#:", err.message);
        } else {
          console.log("Subscribed to /receive/#");
        }
      });
    });

    client.on("message", (topic, message) => {
      console.log(`Received message on ${topic}: ${message.toString()}`);
      logMessageToFile(LOG_FILE_PATH, `Received - Topic: ${topic}, Message: ${message.toString()}`);
    });

    client.on("error", (error) => {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("MQTT Client Error:", errorMessage);
      logMessageToFile(LOG_FILE_PATH, `MQTT Client Error: ${errorMessage}`);
    });

    client.on("close", () => {
      console.log("MQTT connection closed.");
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error connecting to MQTT broker:", errorMessage);
  }
};

/**
 * Publishes a message to a specific topic.
 * @param topic - The MQTT topic
 * @param payload - The message payload
 */
export const publishMessage = (topic: string, payload: object) => {
  try {
    const message = JSON.stringify(payload);
    client.publish(topic, message, (err) => {
      if (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        console.error("Error publishing message:", errorMessage);
        logMessageToFile(LOG_FILE_PATH, `Error Publishing - Topic: ${topic}, Error: ${errorMessage}`);
      } else {
        console.log(`Message published to ${topic}: ${message}`);
        logMessageToFile(LOG_FILE_PATH, `Published - Topic: ${topic}, Message: ${message}`);
      }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error preparing message for publishing:", errorMessage);
  }
};
