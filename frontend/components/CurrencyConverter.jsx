"use client"; 

import { useState, useEffect } from "react";
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/convert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to, amount }),
      });

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
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>
      <TransferForm onConvert={convertCurrency} />
      {convertedAmount && (
        <div className="mt-4 text-center">
          <h2 className="font-semibold">Converted Amount: {convertedAmount}</h2>
        </div>
      )}
      <div className="mt-6 text-center">
        <a href="/history">
          <button className="text-blue-500 hover:underline">
            View Transfer History
          </button>
        </a>
      </div>
    </div>
  );
};

export default CurrencyConverter;
