const db = require('../../config/db.config');

// Create a new occupied lot entry
const createOccupiedLot = (lotData, callback) => {
    const query = 'INSERT INTO occupied_lots (park_id, num_occupied, gate_event_id, timestamp) VALUES (?, ?, ?, ?)';
    db.query(query, [
        lotData.park_id,
        lotData.num_occupied,
        lotData.gate_event_id,
        lotData.timestamp
    ], (err, result) => {
        if (err) return callback(err);
        callback(null, result.insertId);
    });
};

// Retrieve all occupied lots
const getAllOccupiedLots = (callback) => {
    const query = 'SELECT * FROM occupied_lots';
    db.query(query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Retrieve an occupied lot by ID
const getOccupiedLotById = (id, callback) => {
    const query = 'SELECT * FROM occupied_lots WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return callback(err);
        callback(null, result[0]);
    });
};

// Update an occupied lot entry by ID
const updateOccupiedLot = (id, lotData, callback) => {
    const query = 'UPDATE occupied_lots SET park_id = ?, num_occupied = ?, gate_event_id = ?, timestamp = ? WHERE id = ?';
    db.query(query, [
        lotData.park_id,
        lotData.num_occupied,
        lotData.gate_event_id,
        lotData.timestamp,
        id
    ], (err, result) => {
        if (err) return callback(err);
        callback(null, result.affectedRows);
    });
};

// Delete an occupied lot entry by ID
const deleteOccupiedLot = (id, callback) => {
    const query = 'DELETE FROM occupied_lots WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return callback(err);
        callback(null, result.affectedRows);
    });
};

module.exports = {
    createOccupiedLot,
    getAllOccupiedLots,
    getOccupiedLotById,
    updateOccupiedLot,
    deleteOccupiedLot,
};
