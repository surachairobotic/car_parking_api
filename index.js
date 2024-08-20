const express = require('express');
const app = express();
const port = 3000;

// Function to generate random available slots
function getRandomAvailable(lot_size) {
  return Math.floor(Math.random() * (lot_size + 1));
}

// Sample parking lots data
const parkingLots = [
  { id: 0, name: 'A', lot_size: 50, available: 0 },
  { id: 1, name: 'B', lot_size: 40, available: 0 },
  { id: 2, name: 'C', lot_size: 70, available: 0 }
];

app.get('/', (req, res) => {
  res.send('GCP App Engine!');
});

// Endpoint to get parking lots data
app.get('/parking_lots', (req, res) => {
  // Update the available slots with random values
  parkingLots.forEach(lot => {
    lot.available = getRandomAvailable(lot.lot_size);
  });
  res.json(parkingLots);
});

app.listen(port, () => {
  console.log(`Parking lot API listening at http://localhost:${port}`);
});
