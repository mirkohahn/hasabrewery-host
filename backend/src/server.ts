import express from "express";
import bodyParser from "body-parser";

import connectionsRoutes from "./routes/connectionsRoutes";
import mqttRoutes from "./routes/mqttRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use("/connections", connectionsRoutes);
app.use("/mqtt", mqttRoutes);
app.use(errorHandler);

// Start MQTT Client
mqttClient.connect();

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
