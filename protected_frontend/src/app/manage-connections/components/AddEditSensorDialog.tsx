import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  IconButton,
  Chip,
  Box,
  Tooltip,
  Divider,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Function to generate a random 3-byte hex ID
const generateDeviceId = () => {
  return [...Array(3)]
    .map(() => Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, "0"))
    .join("");
};

interface AddEditSensorDialogProps {
  open: boolean;
  onClose: () => void;
  sensor?: any;
}

export default function AddEditSensorDialog({ open, onClose, sensor }: AddEditSensorDialogProps) {
  const [deviceName, setDeviceName] = useState("");
  const [deviceId, setDeviceId] = useState(generateDeviceId());
  const [isControl, setIsControl] = useState(false);
  const [isReceive, setIsReceive] = useState(false);
  const [deviceType, setDeviceType] = useState("Sensor Only");
  const [logicComponent, setLogicComponent] = useState("");
  const [customLogicComponent, setCustomLogicComponent] = useState("");
  const [deviceTypeSelection, setDeviceTypeSelection] = useState("");
  const [customDeviceType, setCustomDeviceType] = useState("");
  const [expectedValues, setExpectedValues] = useState<{ label: string; name: string }[]>([]);
  const [mqttTopics, setMqttTopics] = useState<{ topic: string; editable: boolean }[]>([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  // Reset form when adding a new connection
  useEffect(() => {
    if (!sensor) {
      setDeviceName("");
      setDeviceId(generateDeviceId());
      setIsControl(false);
      setIsReceive(false);
      setDeviceType("Sensor Only");
      setLogicComponent("");
      setCustomLogicComponent("");
      setDeviceTypeSelection("");
      setCustomDeviceType("");
      setExpectedValues([]);
      setMqttTopics([]);
    } else {
      setDeviceName(sensor.name || "");
      setDeviceId(sensor.device_id || generateDeviceId());
      setIsControl(sensor.category?.includes("Control") || false);
      setIsReceive(sensor.category?.includes("Receive") || false);
      setDeviceType(sensor.type || "Sensor Only");
      setLogicComponent(sensor.topic_logic_brewery_component || "");
      setDeviceTypeSelection(sensor.topic_device_type || "");
      setExpectedValues(sensor.expectedValues || []);
    }
  }, [open, sensor]);

  const handleDelete = () => {
    if (deleteInput.toLowerCase() === "delete") {
      console.log("Connection deleted");
      setDeleteConfirmOpen(false);
      onClose();
    }
  };

  // Generate MQTT topic dynamically
  useEffect(() => {
    if ((isReceive || isControl) && logicComponent && deviceTypeSelection) {
      const formattedComponent = logicComponent.replace(/ /g, "_").toLowerCase();
      const topics = [];

      if (isReceive)
        topics.push({
          topic: `/receive/${formattedComponent}/${deviceTypeSelection.toLowerCase()}/${deviceId}`,
          editable: false,
        });
      if (isControl)
        topics.push({
          topic: `/control/${formattedComponent}/${deviceTypeSelection.toLowerCase()}/${deviceId}`,
          editable: false,
        });

      setMqttTopics(topics);
    }
  }, [isReceive, isControl, logicComponent, deviceTypeSelection, deviceId]);

  // Add Expected Value
  const addExpectedValue = () => {
    setExpectedValues([...expectedValues, { label: "", name: "" }]);
  };

  // Update Expected Value
  const updateExpectedValue = (index: number, field: "label" | "name", value: string) => {
    const updatedValues = [...expectedValues];
    updatedValues[index][field] = value;
    setExpectedValues(updatedValues);
  };

  // Remove Expected Value
  const removeExpectedValue = (index: number) => {
    setExpectedValues(expectedValues.filter((_, i) => i !== index));
  };

  // Allow Custom Editing of MQTT Topic
  const editMqttTopic = (index: number) => {
    const updatedTopics = [...mqttTopics];
    updatedTopics[index].editable = true;
    setMqttTopics(updatedTopics);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{sensor ? "Edit Connection" : "Add Connection"}</DialogTitle>
      <Divider />
      <DialogContent>
        {/* Device Name */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            fullWidth
            label="Device Name"
            variant="outlined"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
          <Tooltip title="Enter a unique name for the device">
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Receive & Control Selection */}
        <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
          <Chip
            label="Receive"
            sx={{ backgroundColor: isReceive ? "#28A745" : "#ccc", color: "white", cursor: "pointer" }}
            onClick={() => setIsReceive(!isReceive)}
          />
          <Chip
            label="Control"
            sx={{ backgroundColor: isControl ? "#007BFF" : "#ccc", color: "white", cursor: "pointer" }}
            onClick={() => setIsControl(!isControl)}
          />
            <Tooltip title="Select whether the device is a sensor or a controller">
            <IconButton sx={{ marginLeft: "auto" }}>
              <HelpOutlineIcon />
            </IconButton>
            </Tooltip>
        </Box>

        {/* Device ID with Generate Button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 2 }}>
          <TextField
            fullWidth
            label="Device ID"
            variant="outlined"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value.toUpperCase())}
          />
          <Button onClick={() => setDeviceId(generateDeviceId())} sx={{ color: "#2b2d42" }}>
            Generate ID
          </Button>
          <Tooltip title="Select whether the device is a sensor or a controller">
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Controller or Sensor Selection */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 2 }}>
          <Select fullWidth value={deviceType} onChange={(e) => setDeviceType(e.target.value)}>
            <MenuItem value="Sensor Only">Sensor Only</MenuItem>
            <MenuItem value="Controller">Controller</MenuItem>
          </Select>
          <Tooltip title="Select whether the device is a sensor or a controller">
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Logic Brewery Component */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 2 }}>
          <Select fullWidth value={logicComponent} onChange={(e) => setLogicComponent(e.target.value)}>
            <MenuItem value="Hot Liquor Tank">Hot Liquor Tank</MenuItem>
            <MenuItem value="Mash Tun">Mash Tun</MenuItem>
            <MenuItem value="Boil Kettle">Boil Kettle</MenuItem>
            <MenuItem value="HERMS Kettle">HERMS Kettle</MenuItem>
            <MenuItem value="Fermenter">Fermenter</MenuItem>
            <MenuItem value="Conditioning Vessel">Conditioning Vessel</MenuItem>
            <MenuItem value="Fridge">Fridge</MenuItem>
            <MenuItem value="Keezer/Kegerator">Keezer/Kegerator</MenuItem>
            <MenuItem value="CUSTOM">Custom</MenuItem>
          </Select>
          <Tooltip title="Select whether the device is a sensor or a controller">
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {logicComponent === "CUSTOM" && (
          <TextField
            fullWidth
            label="Custom Logic Component"
            variant="outlined"
            value={customLogicComponent}
            onChange={(e) => setCustomLogicComponent(e.target.value)}
          />
        )}

        {/* Device Type */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 2 }}>
          <Select fullWidth value={deviceTypeSelection} onChange={(e) => setDeviceTypeSelection(e.target.value)}>
            <MenuItem value="Thermometer">Thermometer</MenuItem>
            <MenuItem value="Pressure Sensor">Pressure Sensor</MenuItem>
            <MenuItem value="Solenoid Valve">Solenoid Valve</MenuItem>
            <MenuItem value="Pump">Pump</MenuItem>
            <MenuItem value="Heater">Heater</MenuItem>
            <MenuItem value="Cooler">Cooler</MenuItem>
            <MenuItem value="Fan">Fan</MenuItem>
            <MenuItem value="Relay">Relay</MenuItem>
            <MenuItem value="CUSTOM">Custom</MenuItem>
          </Select>
          <Tooltip title="Select whether the device is a sensor or a controller">
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {deviceTypeSelection === "CUSTOM" && (
          <TextField
            fullWidth
            label="Custom Device Type"
            variant="outlined"
            value={customDeviceType}
            onChange={(e) => setCustomDeviceType(e.target.value)}
          />
        )}

        {/* MQTT Topics */}
        {mqttTopics.length > 0 && (
          <Box sx={{ marginTop: 2 }}>
            {mqttTopics.map((topic, idx) => (
              <Box key={idx} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {topic.editable ? (
                  <TextField fullWidth variant="outlined" defaultValue={topic.topic} />
                ) : (
                  <Typography variant="body2">{topic.topic}</Typography>
                )}
                <IconButton onClick={() => editMqttTopic(idx)}>
                  <EditIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        {/* Expected Values */}
        
          <Button startIcon={<AddCircleOutlineIcon />} onClick={addExpectedValue} sx={{ marginTop: 2, color: "#2b2d42" }}>
          Expect Values
        </Button>
        
        {expectedValues.map((val, idx) => (
          <Box key={idx} sx={{ display: "flex", gap: 2, marginTop: 1 }}>
            <TextField
              fullWidth
              label="Value Label"
              variant="outlined"
              value={val.label}
              onChange={(e) => updateExpectedValue(idx, "label", e.target.value)}
            />
            <TextField
              fullWidth
              label="Value Name"
              variant="outlined"
              value={val.name}
              onChange={(e) => updateExpectedValue(idx, "name", e.target.value)}
            />
            <IconButton onClick={() => removeExpectedValue(idx)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </DialogContent>

      <DialogActions>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            onClick={() => setDeleteConfirmOpen(true)}
            sx={{ border: "1px solid red", color: "red", "&:hover": { backgroundColor: "rgba(255,0,0,0.1)" } }}
          >
            Delete Connection
          </Button>
        </Box>
        <Button onClick={onClose} sx={{ color: "#2b2d42" }}>
          Cancel
        </Button>
        <Button variant="contained" sx={{ backgroundColor: "#2b2d42", color: "#FFF" }}>
          Save
        </Button>
      </DialogActions>


      {/* Confirm Delete Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Type "delete" to confirm deletion.</Typography>
          <TextField fullWidth variant="outlined" value={deleteInput} onChange={(e) => setDeleteInput(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} sx={{ color: "#2b2d42" }}>
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" sx={{ backgroundColor: "red", color: "#FFF" }} disabled={deleteInput.toLowerCase() !== "delete"}>
            Confirm Deletion
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}
