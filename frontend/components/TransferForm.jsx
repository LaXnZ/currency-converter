"use client"; 

import { useState } from "react";

const TransferForm = ({ onConvert }) => {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("LKR");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onConvert(from, to, amount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="from" className="block text-sm font-medium text-gray-700">
          From Currency
        </label>
        <select
          id="from"
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

      <div>
        <label htmlFor="to" className="block text-sm font-medium text-gray-700">
          To Currency
        </label>
        <select
          id="to"
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

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Convert
      </button>
    </form>
  );
};

export default TransferForm;
