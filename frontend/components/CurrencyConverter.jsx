"use client";

import { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import Navbar from "./Navbar";
import TransferForm from "./TransferForm";

const CurrencyConverter = () => {
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [transferHistory, setTransferHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("transferHistory")) || [];
    setTransferHistory(history);
  }, []);

  const convertCurrency = async (from, to, amount) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/convert`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ from, to, amount }),
        }
      );

      const data = await response.json();
      setConvertedAmount(data.convertedAmount);

      const newTransfer = {
        from,
        to,
        amount,
        convertedAmount: data.convertedAmount,
        date: new Date().toISOString(),
      };

      const updatedHistory = [...transferHistory, newTransfer];
      setTransferHistory(updatedHistory);
      localStorage.setItem("transferHistory", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Error converting currency:", error);
      alert("Something went wrong with the conversion. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: 3,
        p: 4,
        mt: 6,
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 3, textAlign: "center", color: "#333" }}
      >
        Currency Converter
      </Typography>

      <TransferForm onConvert={convertCurrency} />

      {convertedAmount && (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
            Converted Amount: {convertedAmount}
          </Typography>
        </Box>
      )}

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="outlined"
          color="neutral"
          href="/history"
          sx={{
            borderRadius: "8px",
            padding: "8px 24px",
            fontSize: "16px",
            color: "#333",
            borderColor: "#ddd",
            "&:hover": {
              borderColor: "#aaa",
            },
          }}
        >
          View Transfer History
        </Button>
      </Box>
    </Box>
  );
};

export default CurrencyConverter;
