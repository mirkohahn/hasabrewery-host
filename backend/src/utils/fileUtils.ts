import fs from "fs";
import path from "path";

const connectionsPath = path.join(__dirname, "../data/current_connections.json");

/**
 * Reads the current_connections.json file and returns its contents.
 * @returns Parsed JSON data
 */
export const readConnectionsFile = (): any[] => {
  try {
    if (!fs.existsSync(connectionsPath)) {
      fs.writeFileSync(connectionsPath, JSON.stringify([], null, 2));
    }
    const data = fs.readFileSync(connectionsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error reading connections file:", errorMessage);
    return [];
  }
};

/**
 * Writes data to the current_connections.json file.
 * @param data - The data to write (array of connections)
 */
export const writeConnectionsFile = (data: any[]) => {
  try {
    fs.writeFileSync(connectionsPath, JSON.stringify(data, null, 2));
    console.log("Connections file updated successfully.");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error writing to connections file:", errorMessage);
  }
};

/**
 * Logs a message to a file (e.g., mqtt.log).
 * @param logPath - Path to the log file
 * @param message - The message to log
 */
export const logMessageToFile = (logPath: string, message: string) => {
  try {
    fs.appendFileSync(logPath, `${new Date().toISOString()} - ${message}\n`);
    console.log("Message logged successfully.");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error logging message to file:", errorMessage);
  }
};
