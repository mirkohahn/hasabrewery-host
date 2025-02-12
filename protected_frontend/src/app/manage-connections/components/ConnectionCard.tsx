import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Badge,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
} from "@mui/material";
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
  values?: {
    type: string;
    name: string;
    value: number | boolean;
    unit?: string;
  }[];
  type?: string;
  category?: string[];
  topic_logic_brewery_component?: string;
  topic_device_type?: string;
  status?: {
    status_message: string;
    transmission_type: string;
    RSSI: number;
    firmware: string;
  };
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
  status = {
    status_message: "Unknown",
    transmission_type: "unknown",
    RSSI: -100,
    firmware: "N/A",
  },
  battery = 0,
  hasUpdate = false,
  icon = null,
  onEdit,
}: ConnectionCardProps) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [latestData, setLatestData] = useState<any>(null);

  // Fetch latest log data
  useEffect(() => {
    if (!device_id) return;

    const fetchLatestLog = async () => {
      try {
        console.log(`Fetching latest log for device: ${name}`);

        const response = await fetch("http://localhost:3001/api/logs");
        if (!response.ok) throw new Error("Failed to fetch logs");
        const logs = await response.json();

        console.log("Fetched logs:", logs);

        // ✅ Get the most recent log entry for this device
        const latestLog = logs
          .filter((log: any) => log.topic.includes(device_id))
          .sort(
            (a: any, b: any) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          ) // Sort descending
          .at(0);

        if (latestLog) {
          const parsedMessage = JSON.parse(latestLog.message);
          const timestamp = new Date(latestLog.timestamp);
          const formattedTimestamp = timestamp.toLocaleString();

          // ✅ Extract and format sensor values
          const sensorValues = parsedMessage.values?.reduce(
            (acc: any, obj: any) => {
              const [key, value] = Object.entries(obj)[0];
              acc[key] = value;
              return acc;
            },
            {}
          );

          // ✅ Extract Status Info
          const statusInfo = parsedMessage.status || {
            status_message: "Unknown",
            transmission_type: "unknown",
            RSSI: -100,
            firmware: "N/A",
          };

          setLatestData({
            timestamp: formattedTimestamp,
            values: sensorValues,
            status: statusInfo,
          });
        } else {
          setLatestData(null);
        }
      } catch (error) {
        console.error("Error fetching latest log:", error);
      }
    };

    fetchLatestLog();
    const interval = setInterval(fetchLatestLog, 30000); // ✅ Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [device_id]);

  // Battery Level Indicator
  const getBatteryIcon = () => {
    if (battery > 75)
      return <BatteryFullIcon sx={{ color: "green", fontSize: 40 }} />;
    if (battery > 30)
      return <BatteryCharging50Icon sx={{ color: "yellow", fontSize: 40 }} />;
    return <BatteryAlertIcon sx={{ color: "red", fontSize: 40 }} />;
  };

  const now = new Date();
  let latestTimestamp = null;

  if (latestData?.timestamp) {
    const timestampStr = latestData.timestamp.trim();

    // Check if it's in the problematic "DD/MM/YYYY, HH:MM:SS" format
    const match = timestampStr.match(
      /^(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2}):(\d{2})$/
    );

    if (match) {
      // Convert to "YYYY-MM-DDTHH:MM:SSZ"
      const formattedTimestamp = `${match[3]}-${match[2]}-${match[1]}T${match[4]}:${match[5]}:${match[6]}Z`;
      latestTimestamp = new Date(formattedTimestamp);
    } else {
      latestTimestamp = new Date(timestampStr); // Try parsing normally
    }
  }

  const minutesAgo =
    latestTimestamp && !isNaN(latestTimestamp.getTime()) // ✅ Ensure valid date
      ? Math.floor((now.getTime() - latestTimestamp.getTime()) / (1000 * 60))
      : null;

  // 🚀 Debugging Logs
  console.log("Raw Timestamp:", latestData?.timestamp);
  console.log("Formatted Date String:", latestTimestamp?.toISOString());
  console.log("Timestamp (ms):", latestTimestamp?.getTime());
  console.log("Minutes Ago:", minutesAgo);

  const getStatusMessage = (minutesAgo: number | null) => {
    if (minutesAgo === null)
      return "No recent connection detected, likely offline";
    if (minutesAgo < 6) return `Active, last message ${minutesAgo} min ago`;
    if (minutesAgo < 60)
      return `Probably Not Active. Last message ${minutesAgo} min ago`;
    if (minutesAgo < 4320)
      return `Haven't seen in ${Math.floor(minutesAgo / 60)} hours.`;
    return "Offline for more than 3 days now.";
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
        width: "100%", // ✅ Ensures the card does not grow

        maxWidth: "550px", // ✅ Set a reasonable max-width
      }}
      elevation={3}
    >
      {/* Status Indicator */}
      <Tooltip title={getStatusMessage(minutesAgo)}>
        <FiberManualRecordIcon
          sx={{
            position: "absolute",
            top: -20,
            left: -20,
            color:
              latestData && minutesAgo !== null && minutesAgo < 5
                ? "green"
                : "red",
            fontSize: 50,
          }}
        />
      </Tooltip>

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Box sx={{ fontSize: "3rem" }}>{icon}</Box>
          <Typography variant="h6">{name}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
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
          <Typography variant="body2" sx={{ color: "#666" }}>
            ID: {device_id.toUpperCase()}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Topic Path */}
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        {topic_logic_brewery_component} / {topic_device_type}
      </Typography>

      {/* Latest Values */}
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        Latest Sensor Readings
      </Typography>
      {latestData ? (
        <>
          <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
            Last Update: {latestData.timestamp}
          </Typography>

          {/* ✅ FIXED SCROLLABLE ROW */}
          <Box
  sx={{
    width: "100%", // ✅ Keeps it inside the card
    overflowX: "auto", // ✅ Enables horizontal scrolling
    display: "flex",
    paddingBottom: "8px",
  }}
>
  <Box
    sx={{
      display: "flex", // ✅ Ensures all items stay in one row
      gap: 2, // ✅ Adds spacing between boxes
      minWidth: "max-content", // ✅ Prevents shrinking
    }}
  >
    {Object.entries(latestData.values).map(([key, value]) => {
      // ✅ Find the matching value_label from device.expected_values
      const valueLabel =
        values?.find((val: any) => val.value_name === key)
          ?.value_label || key.replace(/_/g, " ");

      return (
        <Box
          key={key}
          sx={{
            backgroundColor: "#f4f4f4",
            padding: "10px",
            borderRadius: "12px",
            minWidth: "120px", // ✅ Ensures each value has enough space
            textAlign: "center",
            whiteSpace: "nowrap", // ✅ Prevents text wrapping
            flexShrink: 0, // ✅ Keeps the row scrollable
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {valueLabel}
          </Typography>
          <Typography variant="h6">
            {typeof value === "boolean"
              ? value
                ? "ON"
                : "OFF"
              : `${value} °C`}
          </Typography>
        </Box>
      );
    })}
  </Box>
</Box>

        </>
      ) : (
        <Typography variant="body2" sx={{ mt: 2, color: "red" }}>
          No data available.
        </Typography>
      )}

      <Divider />

      {/* Status Info */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: "center", flex: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Status
          </Typography>
          <Typography variant="body2">
            {latestData?.status?.status_message || "Unknown"}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center", flex: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Connection
          </Typography>
          <Typography variant="body2">
            {latestData?.status?.transmission_type || "unknown"}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center", flex: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            RSSI
          </Typography>
          <Typography variant="body2">
            {latestData?.status?.RSSI ?? "-100"} dBm
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center", flex: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Firmware
          </Typography>
          <Typography variant="body2">
            {latestData?.status?.firmware || "N/A"}
          </Typography>
        </Box>

        {/* Battery Icon */}
        <Box>{getBatteryIcon()}</Box>
      </Box>
    </Paper>
  );
}
