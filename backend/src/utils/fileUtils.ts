import fs from "fs";
import path from "path";

const LOG_FILE_PATH = path.join(__dirname, "../logs/mqtt_logs.json");

// Ensure the log file exists
if (!fs.existsSync(LOG_FILE_PATH)) {
  fs.writeFileSync(LOG_FILE_PATH, JSON.stringify([], null, 2));
}

// Function to append an entry to the log file
export function appendLog(entry: any) {
  try {
    const logs = JSON.parse(fs.readFileSync(LOG_FILE_PATH, "utf-8") || "[]");
    logs.push(entry);
    fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(logs, null, 2));
  } catch (err) {
    console.error("❌ Error appending log:", err);
  }
}

// Function to read logs
export function readLogs() {
  try {
    return JSON.parse(fs.readFileSync(LOG_FILE_PATH, "utf-8") || "[]");
  } catch (err) {
    console.error("❌ Error reading logs:", err);
    return [];
  }
}
