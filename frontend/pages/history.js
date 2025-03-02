"use client";

import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";

const TransferHistoryPage = () => {
  const [transferHistory, setTransferHistory] = useState([]);
  const router = useRouter();

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

      const updatedHistory = transferHistory.filter(
        (transfer) => transfer._id !== id
      );
      setTransferHistory(updatedHistory);
      localStorage.setItem("transferHistory", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Error revoking transfer:", error);
      alert("Failed to revoke transfer.");
    }
  };

  return (
    <Container>
     <Navbar />

      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: "12px",
          boxShadow: 1,
          p: 4,
          marginTop: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Transfer History
        </Typography>

        {transferHistory.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No transfers made yet.
          </Typography>
        ) : (
          <List sx={{ paddingBottom: 2 }}>
            {transferHistory.map((transfer) => (
              <div key={transfer._id || transfer.date}>
                <ListItem
                  sx={{
                    padding: "12px",
                    marginBottom: 2,
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <ListItemText
                    primary={`${transfer.amount} ${transfer.from} = ${transfer.convertedAmount} ${transfer.to}`}
                    secondary={new Date(transfer.date).toLocaleString()}
                    primaryTypographyProps={{
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                    secondaryTypographyProps={{
                      fontSize: "14px",
                      color: "#555",
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => revokeTransfer(transfer._id)}
                    sx={{
                      borderRadius: "8px",
                      textTransform: "none",
                      padding: "6px 12px",
                      fontSize: "14px",
                    }}
                  >
                    Revoke
                  </Button>
                </ListItem>
                <Divider sx={{ marginBottom: 2 }} />
              </div>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default TransferHistoryPage;
