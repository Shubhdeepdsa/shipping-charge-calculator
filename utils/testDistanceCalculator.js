const calculateDistance = require("./distanceCalculator");

const coord1 = { lat: 12.99999, long: 37.923273 }; // Warehouse
const coord2 = { lat: 11.232, long: 23.445495 }; // Customer

const distance = calculateDistance(coord1, coord2);

console.log(`Distance: ${distance.toFixed(2)} km`);
