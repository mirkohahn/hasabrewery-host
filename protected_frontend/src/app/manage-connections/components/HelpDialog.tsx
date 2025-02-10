import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from "@mui/material";

interface HelpDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function HelpDialog({ open, onClose }: HelpDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Manage Connections - Help</DialogTitle>
      <DialogContent>
        <hr style={{ paddingBottom: "16px" }} />
        <Typography variant="body1">
          On this page, you can manage all devices in your local brewery, including sensors, actuators, and controllers and more.
          Also this page is meant to provide a solid overview of the status, firmware version, and signal strength of all devices.
        </Typography>
        <Typography variant="body2" sx={{ marginTop: "10px" }}>
          - <b>Control Devices</b>: Toggle actuators like pumps or heaters.  <br />
          - <b>Receive Devices</b>: Monitor data like temperatures, pressures, etc.<br />  
          - <b>MQTT Topics</b>: Every device communicates over MQTT.  <br />
          - <b>Status</b>: Displays signal strength (RSSI), firmware version, or device state.<br />
        </Typography>
        <Typography variant="body2" sx={{ marginTop: "10px" }}>
          If you need help with getting everything up and running, go and checkout out YouTube tutorials. This 
          might help you get started.
        </Typography>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", maxWidth: "100%", background: "#000", marginTop: "10px" }}>
          <iframe
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            src="https://www.youtube.com/embed/_iKeJ1vQ_qM"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Video"
          />
        </div>
        <Typography variant="body2" sx={{ marginTop: "10px" }}>
          I hope this helps. If you need more help, check out the documentation on GitHub or reach out directly.
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
