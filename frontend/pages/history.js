import { useState, useEffect } from "react";

const TransferHistoryPage = () => {
  const [transferHistory, setTransferHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("transferHistory")) || [];
    setTransferHistory(history);
  }, []);

  const revokeTransfer = (index) => {
    const updatedHistory = transferHistory.filter((_, i) => i !== index);
    setTransferHistory(updatedHistory);
    localStorage.setItem("transferHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h1 className="text-2xl font-bold mb-4">Transfer History</h1>

      {transferHistory.length === 0 ? (
        <p>No transfers made yet.</p>
      ) : (
        <ul className="space-y-4">
          {transferHistory.map((transfer, index) => (
            <li key={index} className="border-b pb-2 mb-2">
              <div>
                <strong>{transfer.amount} {transfer.from}</strong> = {transfer.convertedAmount} {transfer.to}
              </div>
              <div className="text-sm text-gray-500">
                {new Date(transfer.date).toLocaleString()}
              </div>
              <button
                onClick={() => revokeTransfer(index)}
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
