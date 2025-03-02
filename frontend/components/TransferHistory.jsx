"use client";  

import { useState, useEffect } from "react";
import { Button, List, ListItem, ListItemText, Divider, Typography } from "@mui/material";

const TransferHistoryPage = () => {
  const [transferHistory, setTransferHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("transferHistory")) || [];
    setTransferHistory(history);
  }, []);

  const revokeTransfer = async (id) => {
    try {
      if (!id) {
        console.error("Invalid transfer id");
        alert("Transfer id is missing.");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to revoke transfer");

      const updatedHistory = transferHistory.filter((transfer) => transfer._id !== id);
      setTransferHistory(updatedHistory);
      localStorage.setItem("transferHistory", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Error revoking transfer:", error);
      alert("Failed to revoke transfer.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <Typography variant="h5" gutterBottom>
        Transfer History
      </Typography>

      {transferHistory.length === 0 ? (
        <Typography>No transfers made yet.</Typography>
      ) : (
        <List>
          {transferHistory.map((transfer) => (
            <div key={transfer._id || transfer.date}>
              <ListItem>
                <ListItemText
                  primary={`${transfer.amount} ${transfer.from} = ${transfer.convertedAmount} ${transfer.to}`}
                  secondary={new Date(transfer.date).toLocaleString()}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => revokeTransfer(transfer._id)}
                >
                  Revoke
                </Button>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </div>
  );
};

export default TransferHistoryPage;
