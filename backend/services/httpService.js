// backend/services/httpService.js

const axios = require('axios');

module.exports.fetchData = async () => {
  const response = await axios.get('http://api.chucknorris.io/jokes/random');  
  return response.data;
};
