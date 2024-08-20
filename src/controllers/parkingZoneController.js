const parkingZoneModel = require('../models/parkingZoneModel');

// Create a new parking zone
const createParkingZone = (req, res) => {
    const { name, size } = req.body;
    parkingZoneModel.createParkingZone(name, size, (err, id) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Parking zone created successfully', id });
    });
};

// Get all parking zones
const getAllParkingZones = (req, res) => {
    parkingZoneModel.getAllParkingZones((err, zones) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(zones);
    });
};

// Get a parking zone by ID
const getParkingZoneById = (req, res) => {
    const { id } = req.params;
    parkingZoneModel.getParkingZoneById(id, (err, zone) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!zone) return res.status(404).json({ message: 'Parking zone not found' });
        res.status(200).json(zone);
    });
};

// Update a parking zone by ID
const updateParkingZone = (req, res) => {
    const { id } = req.params;
    const { name, size } = req.body;
    parkingZoneModel.updateParkingZone(id, name, size, (err, affectedRows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (affectedRows === 0) return res.status(404).json({ message: 'Parking zone not found' });
        res.status(200).json({ message: 'Parking zone updated successfully' });
    });
};

// Delete a parking zone by ID
const deleteParkingZone = (req, res) => {
    const { id } = req.params;
    parkingZoneModel.deleteParkingZone(id, (err, affectedRows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (affectedRows === 0) return res.status(404).json({ message: 'Parking zone not found' });
        res.status(200).json({ message: 'Parking zone deleted successfully' });
    });
};

module.exports = {
    createParkingZone,
    getAllParkingZones,
    getParkingZoneById,
    updateParkingZone,
    deleteParkingZone,
};
