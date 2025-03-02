"use client";  

import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <AppBar
      position="sticky"
      sx={{
        borderRadius: "8px",
        bgcolor: "#fafafa",  
        boxShadow: 0,  
        padding: "8px",  
      }}
      className="mb-6"
    >
      <Toolbar>
        <Button
          color="inherit"
          onClick={() => router.push("/")} 
          sx={{
            borderRadius: "4px",
            color: "#333", 
            padding: "6px 12px",  
          }}
        >
          Back
        </Button>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontWeight: "bold",
            color: "#333",  
            fontSize: "2rem",
          }}
        >
          Currency Converter
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
