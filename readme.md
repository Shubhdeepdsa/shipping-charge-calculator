---

```Submit your code here - suraj.kumar@jumbotail.com || tech-hiring@jumbotail.com```

# Jumbotail Code Assessment

This is my submission for the coding assessment for Jumbotail.

The **Shipping Charge Calculator API** is built with **Node.js** and **Express.js**, designed to calculate shipping charges based on a customer’s location, selected product, and delivery type (Standard or Express). The logic is encapsulated in `shippingController.js`, which takes input parameters (`customerId`, `product`, `deliveryType`) and retrieves relevant data from in-memory stores in the `data/` folder. It uses the **Haversine formula** (implemented in `distanceCalculator.js`) to calculate the distance between the customer and the nearest warehouse. The total shipping charge is a combination of the base delivery charge and transportation costs, which depend on the distance and the product's weight. The API is thoroughly tested using **Jest** and **SuperTest**, allowing for easy and robust testing without needing the server to be manually run. The app is structured for both local use via `server.js` and for testing with `app.js`.

## How to Run Locally
  ```bash
  node server.js
  ```

## How to Test
  Since I cannot use Postman on my laptop, I have included tests that can be run with:
  ```bash
  npm test
  ```

---
