// backend/routes/apiRoutes.js

const express = require('express');
const apiController = require('../controllers/apiController');
const router = express.Router();

router.get('/data', apiController.getData);  // Make sure `getData` is correctly imported

module.exports = router;
