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
    try {
      const transfer = await Transfer.findByIdAndDelete(id);
      if (!transfer) {
        throw new Error("Transfer not found");
      }
      return { success: true, message: "Transfer successfully revoked" };
    } catch (error) {
      console.error("Error revoking transfer:", error);
      throw new Error("Failed to revoke transfer");
    }
  }

module.exports = { convertCurrency, getTransferHistory, revokeTransfer };
