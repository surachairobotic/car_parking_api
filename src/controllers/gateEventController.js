const gateEventModel = require('../models/gateEventModel');
const occupiedLotModel = require('../models/occupiedLotModel');

// Create a new gate event
const createGateEvent = (req, res) => {
    const eventData = req.body;

    // Create a new gate event
    gateEventModel.createGateEvent(eventData, (err, gateEventId) => {
        if (err) return res.status(500).json({ error: err.message });

        // Once the gate event is created, update the occupied lots
        updateOccupiedLots(eventData, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            // Respond with a success message including the created gate event ID
            res.status(201).json({
                message: 'Gate event created successfully',
                gateEventId,
                occupiedLotsUpdate: result
            });
        });
    });
};

// Update occupied lots based on the gate event
const updateOccupiedLots = (eventData, callback) => {
    const { gate_event_id, park_id, event } = eventData;

    // Determine the change in occupied lots based on the event type
    let numOccupiedChange = 0;
    if (event.includes('entrance')) {
        numOccupiedChange = 1;
    } else if (event.includes('exit')) {
        numOccupiedChange = -1;
    }

    // Check if an existing occupied lot entry exists
    occupiedLotModel.getAllOccupiedLots((err, lots) => {
        if (err) return callback(err);

        const existingLot = lots.find(lot => lot.park_id === park_id && lot.gate_event_id === gate_event_id);

        if (existingLot) {
            // Update the existing entry
            const updatedData = {
                ...existingLot,
                num_occupied: existingLot.num_occupied + numOccupiedChange,
                timestamp: new Date()
            };
            occupiedLotModel.updateOccupiedLot(existingLot.id, updatedData, (err, affectedRows) => {
                if (err) return callback(err);
                callback(null, { message: 'Occupied lot updated successfully' });
            });
        } else {
            // Create a new entry
            const newLotData = {
                park_id,
                num_occupied: numOccupiedChange,
                gate_event_id,
                timestamp: new Date()
            };
            occupiedLotModel.createOccupiedLot(newLotData, (err, id) => {
                if (err) return callback(err);
                callback(null, { message: 'Occupied lot created successfully', id });
            });
        }
    });
};

// Get all gate events
const getAllGateEvents = (req, res) => {
    gateEventModel.getAllGateEvents((err, events) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(events);
    });
};

// Get a gate event by ID
const getGateEventById = (req, res) => {
    const { id } = req.params;
    gateEventModel.getGateEventById(id, (err, event) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!event) return res.status(404).json({ message: 'Gate event not found' });
        res.status(200).json(event);
    });
};

// Update a gate event by ID
const updateGateEvent = (req, res) => {
    const { id } = req.params;
    const eventData = req.body;
    gateEventModel.updateGateEvent(id, eventData, (err, affectedRows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (affectedRows === 0) return res.status(404).json({ message: 'Gate event not found' });
        res.status(200).json({ message: 'Gate event updated successfully' });
    });
};

// Delete a gate event by ID
const deleteGateEvent = (req, res) => {
    const { id } = req.params;
    gateEventModel.deleteGateEvent(id, (err, affectedRows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (affectedRows === 0) return res.status(404).json({ message: 'Gate event not found' });
        res.status(200).json({ message: 'Gate event deleted successfully' });
    });
};

module.exports = {
    createGateEvent,
    getAllGateEvents,
    getGateEventById,
    updateGateEvent,
    deleteGateEvent,
};
