"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ConnectionCard from "./components/ConnectionCard";
import HelpDialog from "./components/HelpDialog";
import AddEditSensorDialog from "./components/AddEditSensorDialog";
import ScanForSensors from "./components/ScanForSensors";

// **Generate a random 3-byte hex value**
const generateDeviceId = () => {
  return [...Array(3)].map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, "0")).join("");
};

const categories = [
  ["Receive"],
  ["Control"],
  ["Control", "Receive"], // Some devices have both categories
];

// **Mock 12 Sensors**
const mockDevices = Array.from({ length: 12 }, (_, idx) => ({
  id: idx + 1,
  name: `Device ${idx + 1}`,
  device_id: generateDeviceId(),
  values: [{ type: "temperature", name: "temp_sensor", value: parseFloat((20 + Math.random() * 10).toFixed(1)), unit: "°C" }],
  type: idx % 2 === 0 ? "Sensor" : "Controller",
  category: categories[idx % 3], // "Receive", "Control", or both
  topic_logic_brewery_component: ["Fermentation Vessel", "Boil Kettle", "Mash Tun", "Conditioning Tank"][idx % 4],
  topic_device_type: ["Thermometer", "Pump", "Pressure Sensor", "Solenoid"][idx % 4],
  status: { status_message: idx % 2 === 0 ? "OK" : "Firmware Update Available", transmission_type: "wifi", RSSI: -60 - idx, firmware: `1.${idx}.0` },
  battery: Math.floor(Math.random() * 100),
  hasUpdate: idx % 3 === 0,
  icon: idx % 2 === 0 ? <DeviceThermostatIcon /> : <PowerSettingsNewIcon />,
}));


export default function ManageConnections() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [addSensorOpen, setAddSensorOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [scanOpen, setScanOpen] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<any>(null);
  const isMediumScreen = useMediaQuery("(max-width:1024px)");
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const handleEditSensor = (sensor: any) => {
    setSelectedSensor(sensor);
    setAddSensorOpen(true);
  };

  const handleAddConnection = () => setWizardOpen(true);

  const handleScanForSensors = () => {
    setWizardOpen(false);
    setScanOpen(true);
  };

  const handleAddManually = () => {
    setWizardOpen(false);
    setSelectedSensor(null); // Open with an empty form
    setAddSensorOpen(true);
  };

  const handleSensorSelect = (sensor: any) => {
    setScanOpen(false);
    setSelectedSensor(sensor); // Pre-fill the form with the selected sensor
    setAddSensorOpen(true);
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#FAF9F1", minHeight: "100vh" }}>
      {/* Header with Update and Add Connection Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Manage Connections
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <IconButton sx={{ backgroundColor: "#2b2d42", color: "#FFF" }}>
            <RefreshIcon />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ backgroundColor: "#2b2d42", color: "#FFF" }}
            onClick={handleAddConnection}
          >
            Add Connection
          </Button>
        </Box>
      </Box>

      {/* Device Grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: isSmallScreen ? "1fr" : isMediumScreen ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: "20px" }}>
        {mockDevices.map((device) => (
          <ConnectionCard key={device.id} {...device} onEdit={() => handleEditSensor(device)} />
        ))}
      </Box>

      {/* Floating Help Button */}
      <IconButton onClick={() => setHelpOpen(true)} sx={{ position: "fixed", bottom: 20, right: 20, backgroundColor: "#2b2d42", color: "#FFF", width: 50, height: 50, borderRadius: "50%" }}>
        <HelpOutlineIcon />
      </IconButton>

      {/* Wizard Dialog */}
      <Dialog open={wizardOpen} onClose={() => setWizardOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Add Connection</DialogTitle>
        <DialogContent>
          <Typography variant="body1">How would you like to add the connection?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleScanForSensors} sx={{ color: "#2b2d42" }}>
            Scan for Sensors
          </Button>
          <Button onClick={handleAddManually} variant="contained" sx={{ backgroundColor: "#2b2d42", color: "#FFF" }}>
            Add Manually
          </Button>
        </DialogActions>
      </Dialog>

      {/* Help Dialog */}
      <HelpDialog open={helpOpen} onClose={() => setHelpOpen(false)} />

      {/* Scan for Sensors Dialog */}
      <ScanForSensors
        open={scanOpen}
        onClose={() => setScanOpen(false)}
        onSensorSelect={handleSensorSelect}
      />

      {/* Add/Edit Sensor Dialog */}
      <AddEditSensorDialog open={addSensorOpen} onClose={() => setAddSensorOpen(false)} sensor={selectedSensor} />
    </Box>
  );
}
