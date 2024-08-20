const db = require('../../config/db.config');

// Create a new parking zone
const createParkingZone = (name, size, callback) => {
    const query = 'INSERT INTO parking_zone (name, size) VALUES (?, ?)';
    db.query(query, [name, size], (err, result) => {
        if (err) return callback(err);
        callback(null, result.insertId);
    });
};

// Retrieve all parking zones
const getAllParkingZones = (callback) => {
    const query = 'SELECT * FROM parking_zone';
    db.query(query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Retrieve a parking zone by ID
const getParkingZoneById = (id, callback) => {
    const query = 'SELECT * FROM parking_zone WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return callback(err);
        callback(null, result[0]);
    });
};

// Update a parking zone by ID
const updateParkingZone = (id, name, size, callback) => {
    const query = 'UPDATE parking_zone SET name = ?, size = ? WHERE id = ?';
    db.query(query, [name, size, id], (err, result) => {
        if (err) return callback(err);
        callback(null, result.affectedRows);
    });
};

// Delete a parking zone by ID
const deleteParkingZone = (id, callback) => {
    const query = 'DELETE FROM parking_zone WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return callback(err);
        callback(null, result.affectedRows);
    });
};

module.exports = {
    createParkingZone,
    getAllParkingZones,
    getParkingZoneById,
    updateParkingZone,
    deleteParkingZone,
};
