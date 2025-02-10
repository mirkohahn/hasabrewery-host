import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';

const DEVICES_FILE_PATH = path.join(__dirname, '../data/devices.json');

// Ensure the devices.json file exists
if (!fs.existsSync(DEVICES_FILE_PATH)) {
  fs.writeFileSync(DEVICES_FILE_PATH, JSON.stringify([]));
}

// Load devices from file
const loadDevices = (): any[] => {
  try {
    const data = fs.readFileSync(DEVICES_FILE_PATH, "utf-8");
    console.log("Raw devices.json content:", data); // Debug log

    const parsedData = data ? JSON.parse(data) : [];
    console.log("Parsed devices.json content:", parsedData); // Debug log

    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error("Error reading devices.json:", error);
    return []; // Always return an array to prevent errors
  }
};



// Save devices to file
const saveDevices = (devices: any[]) => {
  try {
    fs.writeFileSync(DEVICES_FILE_PATH, JSON.stringify(devices, null, 2));
  } catch (error) {
    console.error('Error writing to devices.json:', error);
  }
};

export const createDevice = (req: Request, res: Response) => {
  const { id, name, type } = req.body;
  if (!id || !name || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const devices = loadDevices();
  if (devices.find((device) => device.id === id)) {
    return res.status(400).json({ error: 'Device with this ID already exists' });
  }

  const newDevice = { id, name, type };
  devices.push(newDevice);
  saveDevices(devices);

  res.status(201).json({ message: 'Device created successfully', device: newDevice });
};

export const getDevices = (req: Request, res: Response) => {
  const devices = loadDevices();
  res.status(200).json(devices);
};

export const getDeviceById = (req: Request, res: Response) => {
  const devices = loadDevices();
  const device = devices.find((d) => d.id === req.params.id);
  if (!device) {
    return res.status(404).json({ error: 'Device not found' });
  }
  res.status(200).json(device);
};

export const deleteDeviceById = (req: Request, res: Response) => {
  let devices = loadDevices();
  const index = devices.findIndex((d) => d.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Device not found' });
  }

  devices.splice(index, 1);
  saveDevices(devices);
  res.status(200).json({ message: 'Device deleted successfully' });
};
