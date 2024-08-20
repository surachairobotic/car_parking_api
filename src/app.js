const express = require('express');
const parkingZoneRoutes = require('./routes/parkingZoneRoutes');
const gateEventRoutes = require('./routes/gateEventRoutes');
const occupiedLotRoutes = require('./routes/occupiedLotRoutes');
const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(express.json());

app.use('/api', parkingZoneRoutes);
app.use('/api', gateEventRoutes);
app.use('/api', occupiedLotRoutes);

app.use(errorHandler);

module.exports = app;
