import paho.mqtt.client as mqtt
from flask import Flask, jsonify, request
import json
import datetime

app = Flask(__name__)

MQTT_BROKER = "mqtt-broker"
MQTT_PORT = 1883

client = mqtt.Client()

# Callback function for when a message is received from the MQTT broker
def on_message(client, userdata, message):
    topic = message.topic
    payload = message.payload.decode('utf-8')
    
    # Assume payload is a JSON string and parse it
    try:
        data = json.loads(payload)
    except json.JSONDecodeError:
        print("Error decoding the payload:", payload)
        return
    
    print(f"Received message on topic '{topic}': {data}")
    # Here you can add logic to process the received data

# Connect to MQTT broker
try:
    client.connect(MQTT_BROKER, MQTT_PORT, 60)
    print(f"✅ Connected to MQTT broker at {MQTT_BROKER}:{MQTT_PORT}")
except Exception as e:
    print(f"❌ Error connecting to MQTT broker: {str(e)}")
    raise

# Subscribe to the /receive/# topic to listen for sensor data
client.subscribe("/receive/#")
client.on_message = on_message

# Function to publish messages to /control/{logical_brewery_component}/{device_type}/{device_id}/
def publish_control_message(logical_brewery_component, device_type, device_id, values):
    timestamp = datetime.datetime.utcnow().isoformat() + "Z"  # UTC timestamp
    payload = {
        "timestamp": timestamp,
        **values,
        "status": "active"
    }
    topic = f"/control/{logical_brewery_component}/{device_type}/{device_id}/"
    client.publish(topic, json.dumps(payload))
    print(f"Published control message to topic '{topic}' with payload: {payload}")

@app.route('/publish/<logical_brewery_component>/<device_type>/<device_id>', methods=['POST'])
def publish_message(logical_brewery_component, device_type, device_id):
    # Get the values from the request JSON payload
    if not request.json:
        return jsonify({"error": "No JSON payload provided"}), 400

    values = request.json

    # Ensure the correct format is provided
    if 'value_1' not in values:
        return jsonify({"error": "Missing required value_1 field"}), 400

    # Publish to the control topic
    publish_control_message(logical_brewery_component, device_type, device_id, values)
    
    return jsonify({"status": "Message sent successfully"}), 200

# Run the MQTT client loop in the background to handle incoming messages
def run_mqtt_loop():
    client.loop_start()

if __name__ == "__main__":
    run_mqtt_loop()  # Start the MQTT loop
    app.run(host="0.0.0.0", port=5678)  # Start the Flask app
