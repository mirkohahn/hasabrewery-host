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
  Box,
} from "@mui/material";

interface Sensor {
  topic: string;
  values: Record<string, string>;
}

interface ScanForSensorsProps {
  open: boolean;
  onClose: () => void;
  onSensorSelect: (sensor: Sensor) => void;
}

export default function ScanForSensors({ open, onClose, onSensorSelect }: ScanForSensorsProps) {
  const [receiveSensors, setReceiveSensors] = useState<Sensor[]>([]);
  const [controlSensors, setControlSensors] = useState<Sensor[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (open) {
      setReceiveSensors([]);
      setControlSensors([]);
      setIsScanning(true);

      const mockReceiveSensors: Sensor[] = [
        { topic: "/receive/fermenter/thermometer/123ABC", values: { temperature: "25°C" } },
        { topic: "/receive/mash_tun/thermometer/456DEF", values: { temperature: "65°C" } },
      ];
      const mockControlSensors: Sensor[] = [
        { topic: "/control/boil_kettle/pump/789GHI", values: { state: "ON" } },
        { topic: "/control/herms_kettle/valve/012JKL", values: { state: "CLOSED" } },
      ];

      let index = 0;
      const interval = setInterval(() => {
        if (index < mockReceiveSensors.length) {
          setReceiveSensors((prev) => [...prev, mockReceiveSensors[index]].filter(Boolean));
        }
        if (index < mockControlSensors.length) {
          setControlSensors((prev) => [...prev, mockControlSensors[index]].filter(Boolean));
        }
        index++;
        if (index >= mockReceiveSensors.length && index >= mockControlSensors.length) {
          clearInterval(interval);
          setIsScanning(false);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [open]);

  if (!isClient) {
    return null;
  }

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
          Found Sensors (/receive/#)
        </Typography>
        <Table>
          <TableBody>
            {receiveSensors.length > 0 ? (
              receiveSensors.map((sensor, idx) => (
                sensor?.topic ? (
                  <TableRow
                    key={idx}
                    hover
                    onClick={() => onSensorSelect(sensor)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{sensor.topic}</TableCell>
                    <TableCell>
                      {sensor.values &&
                        Object.entries(sensor.values).map(([key, value]) => (
                          <Typography key={key}>{key}: {value}</Typography>
                        ))}
                    </TableCell>
                  </TableRow>
                ) : null
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

        {/* Control Sensors Table */}
        <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1 }}>
          Found Sensors (/control/#)
        </Typography>
        <Table>
          <TableBody>
            {controlSensors.length > 0 ? (
              controlSensors.map((sensor, idx) => (
                sensor?.topic ? (
                  <TableRow
                    key={idx}
                    hover
                    onClick={() => onSensorSelect(sensor)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{sensor.topic}</TableCell>
                    <TableCell>
                      {sensor.values &&
                        Object.entries(sensor.values).map(([key, value]) => (
                          <Typography key={key}>{key}: {value}</Typography>
                        ))}
                    </TableCell>
                  </TableRow>
                ) : null
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#2b2d42" }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
