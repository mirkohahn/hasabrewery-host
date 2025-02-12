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
        Settings
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
      Include:<br/>
      - ports<br/>
      - up to 10 Hot-Links / Short Cuts<br/>
      - default Chart Dashboard<br/>
      - Metric/IMperial<br/>
      - <br/>
    </Box>
  );
}
