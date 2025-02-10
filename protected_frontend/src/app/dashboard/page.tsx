"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [fermentationOption, setFermentationOption] = useState("Fermentation 1");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isClient, setIsClient] = useState(false);
  const isMediumScreen = useMediaQuery("(max-width:1024px)");
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePageChange = (_event: unknown, newPage: number) => setPage(newPage);
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRowsPerPage(parseInt(event.target.value, 10));

  const dummyData = Array.from({ length: 21 }, (_, idx) => ({
    batchNo: `B${idx + 1}`,
    recipe: `Recipe ${idx + 1}`,
    type: idx % 2 === 0 ? "Ale" : "Lager",
    status: idx % 3 === 0 ? "Brewing" : "Completed",
    brewed: `2023-12-${(idx % 30) + 1}`,
    bottled: idx % 3 === 0 ? "" : `2024-01-${(idx % 30) + 1}`,
    rating: `${(Math.random() * 5).toFixed(1)} / 5`,
  }));

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#FAF9F1", minHeight: "100vh" }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        Dashboard
      </Typography>

      {/* Banner */}
      {bannerVisible && (
        <Paper sx={{ padding: "15px", backgroundColor: "rgba(76, 154, 42, 0.4)", border: "1px solid #4c9a2a", position: "relative", marginBottom: "20px" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
            Updates from HasABrewery
          </Typography>
          <Typography variant="body1">
            <b>Welcome to HasABrewery! 🎉</b> You're among the first users to explore our platform—thank you for joining!
          </Typography>
          <IconButton onClick={() => setBannerVisible(false)} sx={{ position: "absolute", top: 5, right: 5 }}>
            <CloseIcon sx={{ color: "#4c9a2a" }} />
          </IconButton>
        </Paper>
      )}

      {/* First Row: Notifications, Next Steps, Timeline, Temperatures */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: isSmallScreen ? "1fr" : isMediumScreen ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {["Notifications", "Next Steps", "Timeline", "Temperatures"].map((title, idx) => (
          <Paper key={idx} sx={{ padding: "15px", backgroundColor: "#FFF", border: "1px solid #ccc" }} elevation={2}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2">Content placeholder</Typography>
          </Paper>
        ))}
      </Box>

      {/* Second Row: Fermentation Chart, Calendar */}
      <Box sx={{ display: "grid", gridTemplateColumns: isSmallScreen ? "1fr" : "repeat(2, 1fr)", gap: "20px", marginBottom: "20px" }}>
        <Paper sx={{ padding: "15px", backgroundColor: "#FFF", border: "1px solid #ccc", height: "400px" }}>
          <Typography variant="h6">Fermentation Chart</Typography>
          <Select value={fermentationOption} onChange={(e) => setFermentationOption(e.target.value)} size="small">
            <MenuItem value="Fermentation 1">Fermentation 1</MenuItem>
            <MenuItem value="Fermentation 2">Fermentation 2</MenuItem>
            <MenuItem value="Fermentation 3">Fermentation 3</MenuItem>
          </Select>
          <Box sx={{ height: "300px" }}>
            <Line data={{ labels: ["Day 1", "Day 2", "Day 3"], datasets: [{ label: "Temp", data: [12, 14, 16], borderColor: "blue" }] }} />
          </Box>
        </Paper>

        <Paper sx={{ padding: "15px", backgroundColor: "#FFF", border: "1px solid #ccc" }}>
          <Typography variant="h6">Calendar</Typography>
          {isClient ? <Calendar /> : <Typography>Loading Calendar...</Typography>}
        </Paper>
      </Box>

      {/* Third Row: Brewhouse Efficiency, Beers on Tap, CO2 Left */}
      <Box sx={{ display: "grid", gridTemplateColumns: isSmallScreen ? "1fr" : "repeat(3, 1fr)", gap: "20px", marginBottom: "20px" }}>
        {["Brewhouse Efficiency", "Beers on Tap", "CO2 Left"].map((title, idx) => (
          <Paper key={idx} sx={{ padding: "15px", backgroundColor: "#FFF", border: "1px solid #ccc" }} elevation={2}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2">Content placeholder</Typography>
          </Paper>
        ))}
      </Box>

      {/* Fourth Row: Brewing History, Shortcuts & Links */}
      <Box sx={{ display: "grid", gridTemplateColumns: isSmallScreen ? "1fr" : "3fr 1fr", gap: "20px" }}>
        <Paper sx={{ padding: "15px", backgroundColor: "#FFF", border: "1px solid #ccc" }} elevation={2}>
          <Typography variant="h6">Brewing History</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {["Batch No", "Recipe", "Type", "Status", "Brewed", "Bottled/Kegged", "Rating"].map((header, idx) => (
                    <TableCell key={idx} sx={{ fontWeight: "bold" }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
                  <TableRow key={idx}>
                    {Object.values(row).map((value, idx) => (
                      <TableCell key={idx}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination component="div" count={dummyData.length} page={page} onPageChange={handlePageChange} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleRowsPerPageChange} />
        </Paper>
      </Box>
    </Box>
  );
}
