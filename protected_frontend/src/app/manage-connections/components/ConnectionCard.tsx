import React, { useState } from "react";
import { Box, Paper, Typography, IconButton, Badge, Divider, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import BatteryCharging50Icon from "@mui/icons-material/BatteryCharging50";
import BatteryAlertIcon from "@mui/icons-material/BatteryAlert";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface ConnectionCardProps {
  id: number;
  name?: string;
  device_id?: string;
  values?: { type: string; name: string; value: number; unit: string }[];
  type?: string;
  category?: string[];
  topic_logic_brewery_component?: string;
  topic_device_type?: string;
  status?: { status_message: string; transmission_type: string; RSSI: number; firmware: string };
  battery?: number;
  hasUpdate?: boolean;
  icon?: React.ReactNode;
  onEdit: () => void;
}

export default function ConnectionCard({
  name = "Unknown Device",
  device_id = "N/A",
  values = [],
  type = "Unknown",
  category = [],
  topic_logic_brewery_component = "Unknown Component",
  topic_device_type = "Unknown Type",
  status = { status_message: "Unknown", transmission_type: "unknown", RSSI: -100, firmware: "N/A" },
  battery = 0,
  hasUpdate = false,
  icon = null,
  onEdit,
}: ConnectionCardProps) {
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Battery Level Indicator
  const getBatteryIcon = () => {
    if (battery > 75) return <BatteryFullIcon sx={{ color: "green", fontSize: 40 }} />;
    if (battery > 30) return <BatteryCharging50Icon sx={{ color: "yellow", fontSize: 40 }} />;
    return <BatteryAlertIcon sx={{ color: "red", fontSize: 40 }} />;
  };

  return (
    <Paper
      sx={{
        padding: "16px",
        backgroundColor: "#FFF",
        border: "1px solid #ccc",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        position: "relative",
      }}
      elevation={3}
    >
      {/* Status Indicator */}
      <FiberManualRecordIcon
        sx={{
          position: "absolute",
          top: 8,
          left: 24,
          color: status.status_message === "OK" ? "green" : "red",
          fontSize: 16,
        }}
      />

      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Box sx={{ fontSize: "3rem" }}>{icon}</Box>
          <Typography variant="h6">{name}</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton onClick={onEdit}>
              <EditIcon />
            </IconButton>
            {hasUpdate && (
              <IconButton onClick={() => setNotificationOpen(true)}>
                <Badge color="error" variant="dot">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}
          </Box>
          <Typography variant="body2" sx={{ color: "#666" }}>ID: {device_id.toUpperCase()}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* Category & Type */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          {category?.includes("control") && <Chip label="Control" sx={{ backgroundColor: "#007BFF", color: "white", borderRadius: "16px", padding: "5px 10px" }} />}
          {category?.includes("receive") && <Chip label="Receive" sx={{ backgroundColor: "#28A745", color: "white", borderRadius: "16px", padding: "5px 10px" }} />}
        </Box>
        <Typography variant="body2">{type}</Typography>
      </Box>

      {/* MQTT Topic */}
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        {topic_logic_brewery_component} / {topic_device_type}
      </Typography>

      {/* Latest Values */}
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        Latest Values
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        {values.slice(0, 3).map((val, idx) => (
          <Box key={idx} sx={{ display: "flex", flexDirection: "column", textAlign: "center", flex: 1 }}>
            <Typography variant="h6">{val.value} {val.unit}</Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>{val.name}</Typography>
          </Box>
        ))}
      </Box>

      <Divider />

      {/* Status Info */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
        <Box sx={{ textAlign: "center", flex: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>Status</Typography>
          <Typography variant="body2">{status.status_message}</Typography>
        </Box>
        <Box sx={{ textAlign: "center", flex: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>Connection</Typography>
          <Typography variant="body2">{status.transmission_type}</Typography>
        </Box>
        <Box sx={{ textAlign: "center", flex: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>RSSI</Typography>
          <Typography variant="body2">{status.RSSI} dBm</Typography>
        </Box>
        <Box sx={{ textAlign: "center", flex: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>Firmware</Typography>
          <Typography variant="body2">{status.firmware}</Typography>
        </Box>

        {/* Battery Icon */}
        <Box>{getBatteryIcon()}</Box>
      </Box>

      {/* Notification Pop-up */}
      <Dialog open={notificationOpen} onClose={() => setNotificationOpen(false)}>
        <DialogTitle>Software Update Available</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            A new software update is available for this sensor. Please update to the latest version.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNotificationOpen(false)} sx={{ color: "#2b2d42" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
