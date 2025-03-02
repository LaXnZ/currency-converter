import CurrencyConverter from "../components/CurrencyConverter";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f9f9f9",
        padding: 4,
      }}
    >
      <CurrencyConverter />
    </Box>
  );
}
