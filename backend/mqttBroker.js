const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);

const mqttConfig = require('../config/mqttConfig');

module.exports.startBroker = () => {
  server.listen(mqttConfig.port, () => {
    console.log(`MQTT broker running on port ${mqttConfig.port}`);
  });

  aedes.on('client', (client) => {
    console.log(`Client connected: ${client.id}`);
  });
};
