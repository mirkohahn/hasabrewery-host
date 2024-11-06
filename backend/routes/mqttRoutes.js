// backend/routes/mqttRoutes.js

const express = require('express');
const router = express.Router();

// Define a simple route for testing
router.get('/status', (req, res) => {
  res.json({ message: 'MQTT service is running' });
});

module.exports = router;
