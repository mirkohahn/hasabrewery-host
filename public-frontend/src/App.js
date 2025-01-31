import React, { useState } from "react";

function App() {
  const [logicalBreweryComponent, setLogicalBreweryComponent] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [sensor, setSensor] = useState("");
  const [value, setValue] = useState("");

  const handlePublish = async () => {
    // Construct the payload for the control message
    const payload = {
      value_1: value,
    };

    // Construct the endpoint for publishing control messages
    const endpoint = `http://backend-service:5678/publish/${logicalBreweryComponent}/${deviceType}/${sensor}`;

    // Send a POST request to the Flask backend
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Control message published successfully!");
      } else {
        alert("Error publishing control message");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Frontend is Running! PUBLIC 2</h1>

      {/* Dropdown for logical_brewery_component */}
      <div>
        <label>Logical Brewery Component</label>
        <select
          value={logicalBreweryComponent}
          onChange={(e) => setLogicalBreweryComponent(e.target.value)}
        >
          <option value="">Select Component</option>
          <option value="Hot Liquor Tank">Hot Liquor Tank</option>
          <option value="Mash Tun">Mash Tun</option>
          <option value="Boil Kettle">Boil Kettle</option>
          <option value="Fermenter">Fermenter</option>
          <option value="Bottle Filler">Bottle Filler</option>
        </select>
      </div>

      {/* Dropdown for device_type */}
      <div>
        <label>Device Type</label>
        <select
          value={deviceType}
          onChange={(e) => setDeviceType(e.target.value)}
        >
          <option value="">Select Device</option>
          <option value="thermometer">Thermometer</option>
          <option value="pressure">Pressure</option>
          <option value="heater">Heater</option>
          <option value="cooler">Cooler</option>
          <option value="valve">Valve</option>
          <option value="gravity">Gravity</option>
        </select>
      </div>

      {/* Input for sensor */}
      <div>
        <label>Sensor</label>
        <input
          type="text"
          value={sensor}
          onChange={(e) => setSensor(e.target.value)}
          placeholder="Enter sensor ID"
        />
      </div>

      {/* Input for value */}
      <div>
        <label>Value</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
      </div>

      {/* Publish Button */}
      <div>
        <button onClick={handlePublish}>Publish Control Message</button>
      </div>
    </div>
  );
}

export default App;
