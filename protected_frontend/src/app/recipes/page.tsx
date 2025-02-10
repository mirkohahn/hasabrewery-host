import React from "react";
import { Typography, Box } from "@mui/material";

export default function LogsPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 3 }}>
        Recipes
      </Typography>
      
      {/* Responsive Horizontal Line */}
      <Box
        sx={{
          width: "100%",
          height: "4px",
          marginY: 3,
          backgroundColor: {
            xs: "blue",
            sm: "green",
            md: "red",
            lg: "purple",
          },
        }}
      />
      
      <Typography variant="h5" sx={{ color: "gray" }}>
        Coming Soon!
      </Typography>
    </Box>
  );
}
