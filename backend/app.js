const express = require('express');
const mqttService = require('./services/mqttService');
const vpnService = require('./services/vpnService');
const apiRoutes = require('./routes/apiRoutes');
const mqttRoutes = require('./routes/mqttRoutes');  // Ensure this path is correct

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', apiRoutes);
app.use('/mqtt', mqttRoutes);

// Initialize MQTT broker
mqttService.startBroker();

// Initialize VPN (optional)
vpnService.startVPN();

const PORT = process.env.PORT || 7501;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
