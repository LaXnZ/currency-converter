"use client"; 

import { useState } from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography } from "@mui/material";  

const TransferForm = ({ onConvert }) => {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("LKR");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onConvert(from, to, amount);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <FormControl fullWidth>
        <InputLabel>From Currency</InputLabel>
        <Select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          label="From Currency"
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="LKR">LKR</MenuItem>
          <MenuItem value="AUD">AUD</MenuItem>
          <MenuItem value="INR">INR</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>To Currency</InputLabel>
        <Select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          label="To Currency"
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="LKR">LKR</MenuItem>
          <MenuItem value="AUD">AUD</MenuItem>
          <MenuItem value="INR">INR</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
      />

      <Button
        variant="outlined"
        color="neutral"
        type="submit"
        fullWidth
        sx={{
          borderRadius: "8px",
          padding: "12px",
          fontSize: "16px",
          borderColor: "#ccc",
          color: "#333",
          "&:hover": {
            borderColor: "#aaa",
          },
        }}
      >
        Convert
      </Button>
    </form>
  );
};

export default TransferForm;
