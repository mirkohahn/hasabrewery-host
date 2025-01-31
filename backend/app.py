import paho.mqtt.client as mqtt
from flask import Flask, jsonify

app = Flask(__name__)

MQTT_BROKER = "mqtt-broker"
MQTT_PORT = 1883

client = mqtt.Client()

try:
    client.connect(MQTT_BROKER, MQTT_PORT, 60)
    print(f"✅ Connected to MQTT broker at {MQTT_BROKER}:{MQTT_PORT}")
except Exception as e:
    print(f"❌ Error connecting to MQTT broker: {str(e)}")
    raise


@app.route('/publish/<topic>/<message>', methods=['GET'])
def publish_message(topic, message):
    client.publish(topic, message)
    print(f"Publishing message '{message}' to topic '{topic}'")  # Debug line
    return jsonify({"status": f"Message '{message}' sent to topic '{topic}'"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5678)
