const express = require('express');
const parkingZoneController = require('../controllers/parkingZoneController');

const router = express.Router();

router.post('/parking-zones', parkingZoneController.createParkingZone);
router.get('/parking-zones', parkingZoneController.getAllParkingZones);
router.get('/parking-zones/:id', parkingZoneController.getParkingZoneById);
router.put('/parking-zones/:id', parkingZoneController.updateParkingZone);
router.delete('/parking-zones/:id', parkingZoneController.deleteParkingZone);

module.exports = router;
