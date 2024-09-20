// utils/distanceCalculator.js

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function calculateDistance(coord1, coord2) {
  if (
    typeof coord1.lat !== "number" ||
    typeof coord1.lng !== "number" ||
    typeof coord2.lat !== "number" ||
    typeof coord2.lng !== "number"
  ) {
    console.error("Invalid coordinates:", coord1, coord2);
    throw new Error("Invalid coordinates provided for distance calculation.");
  }
  const R = 6371; // Earth's radius in kilometers

  const lat1 = toRadians(coord1.lat);
  const lon1 = toRadians(coord1.lng);
  const lat2 = toRadians(coord2.lat);
  const lon2 = toRadians(coord2.lng);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // in kilometers
  return distance;
}

module.exports = calculateDistance;
