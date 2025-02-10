import express from 'express';
import {
  createDevice,
  getDevices,
  getDeviceById,
  deleteDeviceById,
} from '../controllers/devicesController';

const router = express.Router();

router.post('/', createDevice); // Create a device
router.get('/', getDevices); // Get all devices
router.get('/:id', getDeviceById); // Get device by ID
router.delete('/:id', deleteDeviceById); // Delete device by ID

export default router;
