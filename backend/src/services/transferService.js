const Transfer = require("../entities/Transfer");
const { getExchangeRate } = require("./exchangeRateService");

async function convertCurrency({ from, to, amount }) {
  const rate = await getExchangeRate(from, to);
  const convertedAmount = (amount * rate).toFixed(2);
  const transfer = await Transfer.create({ fromCountry: from, toCountry: to, amount, convertedAmount, rate });
  return transfer;
}

async function getTransferHistory() {
  return await Transfer.find().sort({ date: -1 });
}

async function revokeTransfer(id) {
  await Transfer.findByIdAndDelete(id);
  return { success: true };
}

module.exports = { convertCurrency, getTransferHistory, revokeTransfer };
