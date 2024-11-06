// backend/services/mqttService.js
const aedes = require('aedes')();
const net = require('net');

module.exports.startBroker = () => {
  const server = net.createServer(aedes.handle);
  const PORT = 1883;

  server.listen(PORT, () => {
    console.log(`MQTT broker running on port ${PORT}`);
  });

  aedes.on('client', (client) => {
    console.log(`Client connected: ${client.id}`);
  });
};
