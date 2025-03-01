const express = require("express");
const router = express.Router();
const transferController = require("../controllers/transferController");

router.post("/convert", transferController.convertCurrency);
router.get("/history", transferController.getHistory);
router.delete("/revoke/:id", transferController.revokeTransfer);

module.exports = router;
