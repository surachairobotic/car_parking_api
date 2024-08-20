const express = require('express');
const gateEventController = require('../controllers/gateEventController');

const router = express.Router();

router.post('/gate-events', gateEventController.createGateEvent);
router.get('/gate-events', gateEventController.getAllGateEvents);
router.get('/gate-events/:id', gateEventController.getGateEventById);
router.put('/gate-events/:id', gateEventController.updateGateEvent);
router.delete('/gate-events/:id', gateEventController.deleteGateEvent);

module.exports = router;
