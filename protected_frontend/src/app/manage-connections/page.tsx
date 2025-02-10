"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ConnectionCard from "./components/ConnectionCard";
import HelpDialog from "./components/HelpDialog";
import AddEditSensorDialog from "./components/AddEditSensorDialog";
import ScanForSensors from "./components/ScanForSensors";

export default function ManageConnections() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [addSensorOpen, setAddSensorOpen] = useState(false);
  const [scanOpen, setScanOpen] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<any>(null);
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const isMediumScreen = useMediaQuery("(max-width:1024px)");
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  // ✅ Fetch devices from API only on client-side
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/devices");
        if (!response.ok) throw new Error("Failed to fetch devices");
        const data = await response.json();

        // ✅ Ensure each device has a valid structure
        const formattedDevices = data.map((device: any, index: number) => ({
          ...device,
          device_id: device.device_id || `device-${index}`, // ✅ Ensures unique ID
          category: Array.isArray(device.groups) ? device.groups : [], // ✅ Default category
          status: device.status || {
            status_message: "Unknown",
            transmission_type: "unknown",
            RSSI: -100,
          }, // ✅ Default status if missing
          values: device.expected_values || [], // ✅ Expected values fallback
        }));

        setDevices(formattedDevices);
      } catch (error) {
        console.error("Error loading devices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handleEditSensor = (sensor: any) => {
    setSelectedSensor(sensor);
    setAddSensorOpen(true);
  };

  const handleAddConnection = () => setAddSensorOpen(true);

  const handleScanForSensors = () => {
    setScanOpen(true);
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#FAF9F1", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Manage Devices
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <IconButton sx={{ backgroundColor: "#2b2d42", color: "#FFF" }} onClick={() => setLoading(true)}>
            <RefreshIcon />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ backgroundColor: "#2b2d42", color: "#FFF" }}
            onClick={handleAddConnection}
          >
            Add Device
          </Button>
        </Box>
      </Box>

      {/* ✅ Loading State */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: isSmallScreen ? "1fr" : isMediumScreen ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: "20px" }}>
          {devices.length > 0 ? (
            devices.map((device, index) => (
              <ConnectionCard
                key={device.device_id || index} // ✅ Ensures unique key
                name={device.name}
                device_id={device.device_id}
                values={device.values} // ✅ Sends expected values
                type={device.type}
                category={device.category}
                topic_logic_brewery_component={device.logical_brewery_unit}
                topic_device_type={device.device_type}
                status={device.status}
                battery={device.battery || 100} // ✅ Default to 100% if missing
                hasUpdate={false} // ❌ Currently no update logic, default false
                icon={null} // ❌ Add icon logic later
                onEdit={() => handleEditSensor(device)}
              />
            ))
          ) : (
            <Typography variant="h6" sx={{ textAlign: "center", width: "100%", color: "#666" }}>
              No sensors, controllers or other devices in your brewery.<br/>
              Add a new device to get started.
            </Typography>
          )}
        </Box>
      )}

      {/* Floating Help Button */}
      <IconButton onClick={() => setHelpOpen(true)} sx={{ position: "fixed", bottom: 20, right: 20, backgroundColor: "#FABC18", color: "#2b2d42", width: 50, height: 50, borderRadius: "50%" }}>
        <HelpOutlineIcon />
      </IconButton>

      {/* Help Dialog */}
      <HelpDialog open={helpOpen} onClose={() => setHelpOpen(false)} />

      {/* Scan for Sensors Dialog */}
      <ScanForSensors open={scanOpen} onClose={() => setScanOpen(false)} onSensorSelect={handleEditSensor} />

      {/* Add/Edit Sensor Dialog */}
      <AddEditSensorDialog open={addSensorOpen} onClose={() => setAddSensorOpen(false)} sensor={selectedSensor} />
    </Box>
  );
}
