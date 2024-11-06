// backend/controllers/apiController.js

const httpService = require('../services/httpService');

exports.getData = async (req, res) => {
  try {
    const data = await httpService.fetchData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
};
