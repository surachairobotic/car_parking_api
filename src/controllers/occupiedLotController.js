const occupiedLotModel = require('../models/occupiedLotModel');

// Create a new occupied lot
const createOccupiedLot = (req, res) => {
    const lotData = req.body;
    console.log(lotData)
    occupiedLotModel.createOccupiedLot(lotData, (err, id) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Occupied lot created successfully', id });
    });
};

// Get all occupied lots
const getAllOccupiedLots = (req, res) => {
    occupiedLotModel.getAllOccupiedLots((err, lots) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(lots);
    });
};

// Get an occupied lot by ID
const getOccupiedLotById = (req, res) => {
    const { id } = req.params;
    occupiedLotModel.getOccupiedLotById(id, (err, lot) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!lot) return res.status(404).json({ message: 'Occupied lot not found' });
        res.status(200).json(lot);
    });
};

// Update an occupied lot by ID
const updateOccupiedLot = (req, res) => {
    const { id } = req.params;
    const lotData = req.body;
    occupiedLotModel.updateOccupiedLot(id, lotData, (err, affectedRows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (affectedRows === 0) return res.status(404).json({ message: 'Occupied lot not found' });
        res.status(200).json({ message: 'Occupied lot updated successfully' });
    });
};

// Delete an occupied lot by ID
const deleteOccupiedLot = (req, res) => {
    const { id } = req.params;
    occupiedLotModel.deleteOccupiedLot(id, (err, affectedRows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (affectedRows === 0) return res.status(404).json({ message: 'Occupied lot not found' });
        res.status(200).json({ message: 'Occupied lot deleted successfully' });
    });
};

module.exports = {
    createOccupiedLot,
    getAllOccupiedLots,
    getOccupiedLotById,
    updateOccupiedLot,
    deleteOccupiedLot,
};
