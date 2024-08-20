const express = require('express');
const occupiedLotController = require('../controllers/occupiedLotController');

const router = express.Router();

router.post('/occupied-lots', occupiedLotController.createOccupiedLot);
router.get('/occupied-lots', occupiedLotController.getAllOccupiedLots);
router.get('/occupied-lots/:id', occupiedLotController.getOccupiedLotById);
router.put('/occupied-lots/:id', occupiedLotController.updateOccupiedLot);
router.delete('/occupied-lots/:id', occupiedLotController.deleteOccupiedLot);

module.exports = router;
