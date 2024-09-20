const customers = require("../data/customerData");
const products = require("../data/products");
const deliveryTypes = require("../data/deliveryTypes");
const warehouses = require("../data/warehouses");
const transportModes = require("../data/transportModes");
const calculateDistance = require("../utils/distanceCalculator");

// Function to find the nearest warehouse (unchanged)
function findNearestWarehouse(customerLocation) {
  console.log("Customer location in findNearestWarehouse:", customerLocation);

  let nearestWarehouse = null;
  let minDistance = Infinity;

  for (const warehouseName in warehouses) {
    const warehouseLocation = warehouses[warehouseName];
    console.log(`Checking warehouse: ${warehouseName}`, warehouseLocation);

    const distance = calculateDistance(warehouseLocation, customerLocation);
    console.log(`Distance to ${warehouseName}:`, distance);

    if (isNaN(distance)) {
      console.log("Calculated distance is NaN, possible invalid coordinates.");
      continue;
    }

    if (distance < minDistance) {
      minDistance = distance;
      nearestWarehouse = {
        name: warehouseName,
        location: warehouseLocation,
        distance: distance,
      };
    }
  }

  console.log("Nearest warehouse found:", nearestWarehouse);
  return nearestWarehouse;
}

// Controller function to handle the shipping charge calculation
// exports.getShippingCharge = (req, res) => {
//   try {
//     // Extract query parameters
//     const { customerId, product, deliveryType } = req.query;

//     // Validate parameters
//     if (!customerId || !customers[customerId]) {
//       return res.status(400).json({ error: "Invalid or missing customer ID." });
//     }
//     if (!product || !products[product]) {
//       return res.status(400).json({ error: "Invalid or missing product." });
//     }
//     if (!deliveryType || !deliveryTypes[deliveryType]) {
//       return res
//         .status(400)
//         .json({ error: "Invalid or missing delivery type." });
//     }

//     // Retrieve customer location
//     const customerLocation = customers[customerId];

//     // Retrieve data
//     const productDetails = products[product];
//     const deliveryDetails = deliveryTypes[deliveryType];

//     // Find nearest warehouse
//     const nearestWarehouse = findNearestWarehouse(customerLocation);
//     const distance = nearestWarehouse.distance;

//     // Determine transport mode
//     const transportMode = transportModes.find(
//       (mode) => distance >= mode.minDistance && distance < mode.maxDistance,
//     );

//     if (!transportMode) {
//       return res.status(500).json({ error: "Transport mode not found." });
//     }

//     // Calculate transportation fee
//     const transportationFee =
//       transportMode.rate * distance * productDetails.weight;

//     // Calculate total shipping charge
//     let shippingCharge = deliveryDetails.baseCharge + transportationFee;

//     if (deliveryType === "Express") {
//       shippingCharge +=
//         deliveryDetails.expressMultiplier * productDetails.weight;
//     }

//     // Round to two decimal places
//     shippingCharge = Math.round(shippingCharge * 100) / 100;

//     // Send response
//     res.json({ ShippingCharge: shippingCharge });
//   } catch (error) {
//     console.error("Error calculating shipping charge:", error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// };
exports.getShippingCharge = (req, res) => {
  try {
    // Extract query parameters
    const { customerId, product, deliveryType } = req.query;

    console.log("Received request with parameters:", req.query);

    // Validate parameters
    if (!customerId || !customers[customerId]) {
      console.log("Invalid or missing customer ID.");
      return res.status(400).json({ error: "Invalid or missing customer ID." });
    }
    if (!product || !products[product]) {
      console.log("Invalid or missing product.");
      return res.status(400).json({ error: "Invalid or missing product." });
    }
    if (!deliveryType || !deliveryTypes[deliveryType]) {
      console.log("Invalid or missing delivery type.");
      return res
        .status(400)
        .json({ error: "Invalid or missing delivery type." });
    }

    // Retrieve customer location
    const customerLocation = customers[customerId];
    console.log("Customer location:", customerLocation);

    // Retrieve data
    const productDetails = products[product];
    const deliveryDetails = deliveryTypes[deliveryType];

    // Find nearest warehouse
    const nearestWarehouse = findNearestWarehouse(customerLocation);
    console.log("Nearest warehouse:", nearestWarehouse);

    const distance = nearestWarehouse.distance;
    console.log("Distance to nearest warehouse:", distance);

    // Determine transport mode
    const transportMode = transportModes.find(
      (mode) => distance >= mode.minDistance && distance < mode.maxDistance,
    );

    if (!transportMode) {
      console.log("Transport mode not found for distance:", distance);
      return res.status(500).json({ error: "Transport mode not found." });
    }

    console.log("Transport mode selected:", transportMode);

    // Calculate transportation fee
    const transportationFee =
      transportMode.rate * distance * productDetails.weight;
    console.log("Transportation fee:", transportationFee);

    // Calculate total shipping charge
    let shippingCharge = deliveryDetails.baseCharge + transportationFee;

    if (deliveryType === "Express") {
      const expressCharge =
        deliveryDetails.expressMultiplier * productDetails.weight;
      shippingCharge += expressCharge;
      console.log("Express charge added:", expressCharge);
    }

    // Round to two decimal places
    shippingCharge = Math.round(shippingCharge * 100) / 100;

    console.log("Total shipping charge calculated:", shippingCharge);

    // Send response
    res.json({ ShippingCharge: shippingCharge });
  } catch (error) {
    console.error("Error calculating shipping charge:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
