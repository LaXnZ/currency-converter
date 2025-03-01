const axios = require("axios");

async function getExchangeRate(from, to) {
  const apiKey = process.env.EXCHANGE_RATE_API_KEY;
  const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`);
  return response.data.conversion_rates[to];
}

module.exports = { getExchangeRate };
