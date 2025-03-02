"use client"; 

import { useState, useEffect } from "react";

const TransferHistoryPage = () => {
  const [transferHistory, setTransferHistory] = useState([]);

   
  useEffect(() => {
    const fetchTransferHistory = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/history`
        );
        if (!response.ok) throw new Error("Failed to fetch transfer history");
        const history = await response.json();
        setTransferHistory(history);
      } catch (error) {
        console.error("Error fetching transfer history:", error);
        alert("Failed to load transfer history.");
      }
    };

    fetchTransferHistory();
  }, []);

   
  const revokeTransfer = async (id) => {
    try {
      if (!id) {
        console.error("Invalid transfer id");
        alert("Transfer id is missing.");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/revoke/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to revoke transfer");

      const updatedHistory = transferHistory.filter((transfer) => transfer._id !== id);  
      setTransferHistory(updatedHistory);
    } catch (error) {
      console.error("Error revoking transfer:", error);
      alert("Failed to revoke transfer.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h1 className="text-2xl font-bold mb-4">Transfer History</h1>

      {transferHistory.length === 0 ? (
        <p>No transfers made yet.</p>
      ) : (
        <ul className="space-y-4">
          {transferHistory.map((transfer) => (
            <li key={transfer._id} className="border-b pb-2 mb-2"> 
             
              <div>
                <strong>
                  {transfer.amount} {transfer.from}
                </strong>{" "}
                = {transfer.convertedAmount} {transfer.to}
              </div>
              <div className="text-sm text-gray-500">
                {new Date(transfer.date).toLocaleString()}
              </div>
              <button
                onClick={() => revokeTransfer(transfer._id)}  
                className="text-red-500 hover:underline"
              >
                Revoke
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransferHistoryPage;
