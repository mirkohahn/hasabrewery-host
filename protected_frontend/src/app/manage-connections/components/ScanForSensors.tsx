import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Box,
} from "@mui/material";

interface Sensor {
  topic: string;
  timestamp: string;
}

interface ScanForSensorsProps {
  open: boolean;
  onClose: () => void;
  onSensorSelect: (topic: string) => void; // Forward the topic only
}

export default function ScanForSensors({ open, onClose, onSensorSelect }: ScanForSensorsProps) {
  const [receiveSensors, setReceiveSensors] = useState<Sensor[]>([]);
  const [controlSensors, setControlSensors] = useState<Sensor[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (open) {
      const fetchSensors = async () => {
        try {
          const receiveResponse = await fetch("http://localhost:3001/api/logs?topic=/receive/#");
          if (receiveResponse.ok) {
            const receiveData = await receiveResponse.json();
            const parsedReceive = receiveData
              .map((log: any) => ({
                topic: log.topic,
                timestamp: log.timestamp,
              }))
              .slice(-5) // Take the last 5 entries
              .reverse(); // Reverse to have newest on top
            setReceiveSensors(parsedReceive);
          }

          const controlResponse = await fetch("http://localhost:3001/api/logs?topic=/control/#");
          if (controlResponse.ok) {
            const controlData = await controlResponse.json();
            const parsedControl = controlData
              .map((log: any) => ({
                topic: log.topic,
                timestamp: log.timestamp,
              }))
              .slice(-5) // Take the last 5 entries
              .reverse(); // Reverse to have newest on top
            setControlSensors(parsedControl);
          }
        } catch (error) {
          console.error("Error fetching sensor data:", error);
        }
      };

      setIsScanning(true);
      const interval = setInterval(fetchSensors, 1000);

      return () => {
        clearInterval(interval);
        setIsScanning(false);
      };
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Scan for Sensors</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Scanning the local network for available sensors...
        </Typography>
        {isScanning && (
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Receive Sensors Table */}
        <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1 }}>
          Last 5 Messages (/receive/#)
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {receiveSensors.length > 0 ? (
                receiveSensors.map((sensor, idx) => (
                  <TableRow
                    key={idx}
                    hover
                    onClick={() => onSensorSelect(sensor.topic)} // Forward the topic
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell sx={{ width: "30%" }}>
                      <Typography noWrap>{new Date(sensor.timestamp).toLocaleString()}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography noWrap>{sensor.topic}</Typography>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    <Typography>No sensors found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Control Sensors Table */}
        <Typography variant="h6" sx={{ marginTop: 3, marginBottom: 1 }}>
          Last 5 Messages (/control/#)
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {controlSensors.length > 0 ? (
                controlSensors.map((sensor, idx) => (
                  <TableRow
                    key={idx}
                    hover
                    onClick={() => onSensorSelect(sensor.topic)} // Forward the topic
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell sx={{ width: "30%" }}>
                      <Typography noWrap>{new Date(sensor.timestamp).toLocaleString()}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography noWrap>{sensor.topic}</Typography>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    <Typography>No sensors found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#2b2d42" }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
