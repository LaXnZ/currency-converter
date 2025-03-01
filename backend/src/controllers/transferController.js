const transferService = require('../services/transferService');

async function convertCurrency(req, res) {
  try {
    const { from, to, amount } = req.body;
    const transfer = await transferService.convertCurrency({ from, to, amount });
    res.json(transfer);
  } catch (error) {
    console.error("Error converting currency:", error);
    res.status(500).json({ error: 'Failed to convert currency' });
  }
}

async function getHistory(req, res) {
  try {
    const history = await transferService.getTransferHistory();
    res.json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: 'Failed to fetch transfer history' });
  }
}

async function revokeTransfer(req, res) {
  try {
    const { id } = req.params;
    const result = await transferService.revokeTransfer(id);
    res.json(result);
  } catch (error) {
    console.error("Error revoking transfer:", error);
    res.status(500).json({ error: 'Failed to revoke transfer' });
  }
}

module.exports = {
  convertCurrency,
  getHistory,
  revokeTransfer
};
