import express from "express";
import cors from "cors";
import devicesRoutes from "./routes/devicesRoutes"; // ✅ Ensure this file exists!
import logsRoutes from "./routes/logsRoutes"; // ✅ Ensure this file exists!,
import mqttService from "./services/mqttService";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ✅ Attach API Routes
app.use("/api/devices", devicesRoutes);
app.use("/api/logs", logsRoutes);


mqttService.init();

app.get("/", (req, res) => {
  res.send("Backend API is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
