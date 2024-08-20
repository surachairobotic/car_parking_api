const db = require('../../config/db.config');

// Create a new gate event
const createGateEvent = (eventData, callback) => {
    const query = 'INSERT INTO gate_events (server_time, gate, event, vehicle_type, media_link, timestamp) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [
        eventData.server_time,
        eventData.gate,
        eventData.event,
        eventData.vehicle_type,
        eventData.media_link,
        eventData.timestamp
    ], (err, result) => {
        if (err) return callback(err);
        callback(null, result.insertId);
    });
};

// Retrieve all gate events
const getAllGateEvents = (callback) => {
    const query = 'SELECT * FROM gate_events';
    db.query(query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Retrieve a gate event by ID
const getGateEventById = (id, callback) => {
    const query = 'SELECT * FROM gate_events WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return callback(err);
        callback(null, result[0]);
    });
};

// Update a gate event by ID
const updateGateEvent = (id, eventData, callback) => {
    const query = 'UPDATE gate_events SET server_time = ?, gate = ?, event = ?, vehicle_type = ?, media_link = ?, timestamp = ? WHERE id = ?';
    db.query(query, [
        eventData.server_time,
        eventData.gate,
        eventData.event,
        eventData.vehicle_type,
        eventData.media_link,
        eventData.timestamp,
        id
    ], (err, result) => {
        if (err) return callback(err);
        callback(null, result.affectedRows);
    });
};

// Delete a gate event by ID
const deleteGateEvent = (id, callback) => {
    const query = 'DELETE FROM gate_events WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return callback(err);
        callback(null, result.affectedRows);
    });
};

module.exports = {
    createGateEvent,
    getAllGateEvents,
    getGateEventById,
    updateGateEvent,
    deleteGateEvent,
};
