import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from "@mui/material";

interface HelpDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function HelpDialog({ open, onClose }: HelpDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>HUHU Manage Connections Help</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Here you can manage all devices in your brewery, including sensors, actuators, and controllers.
        </Typography>
        <Typography variant="body2" sx={{ marginTop: "10px" }}>
          - **Control Devices**: Toggle actuators like pumps or heaters.  
          - **Receive Devices**: Monitor data like temperatures, pressures, etc.  
          - **MQTT Topics**: Every device communicates over MQTT.  
          - **Status**: Displays signal strength (RSSI), firmware version, or device state.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "#2b2d42" }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
