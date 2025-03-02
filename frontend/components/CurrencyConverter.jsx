"use client";  

import { useState } from "react";

const CurrencyConverter = () => {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("LKR");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const convertCurrency = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/convert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          amount,
        }),
      });

      const data = await response.json();
      setConvertedAmount(data.convertedAmount);
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>

      {/* Currency Converter Form */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">From Currency</label>
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
        >
          <option value="USD">USD</option>
          <option value="LKR">LKR</option>
          <option value="AUD">AUD</option>
          <option value="INR">INR</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">To Currency</label>
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
        >
          <option value="USD">USD</option>
          <option value="LKR">LKR</option>
          <option value="AUD">AUD</option>
          <option value="INR">INR</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
        />
      </div>

      <button
        onClick={convertCurrency}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Convert
      </button>

      {/* Display the converted amount */}
      {convertedAmount && (
        <div className="mt-4 text-center">
          <h2 className="font-semibold">Converted Amount: {convertedAmount}</h2>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
