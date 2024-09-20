const request = require("supertest");
const app = require("../app");

describe("GET /shipping-charge", () => {
  it("should return the shipping charge for valid inputs", async () => {
    const response = await request(app).get("/shipping-charge").query({
      customerId: "Cust-123",
      product: "Rice Bag 10Kg",
      deliveryType: "Express",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("ShippingCharge");
    expect(typeof response.body.ShippingCharge).toBe("number");
  });

  it("should return an error for invalid customer ID", async () => {
    const response = await request(app).get("/shipping-charge").query({
      customerId: "InvalidCustomer",
      product: "Rice Bag 10Kg",
      deliveryType: "Express",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Invalid or missing customer ID.",
    );
  });

  it("should return an error for missing product", async () => {
    const response = await request(app).get("/shipping-charge").query({
      customerId: "Cust-123",
      deliveryType: "Express",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Invalid or missing product.",
    );
  });

  it("should return an error for invalid delivery type", async () => {
    const response = await request(app).get("/shipping-charge").query({
      customerId: "Cust-123",
      product: "Rice Bag 10Kg",
      deliveryType: "InvalidType",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Invalid or missing delivery type.",
    );
  });

  it("should handle standard delivery correctly", async () => {
    const response = await request(app).get("/shipping-charge").query({
      customerId: "Cust-124",
      product: "Sugar Bag 25kg",
      deliveryType: "Standard",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("ShippingCharge");
    expect(typeof response.body.ShippingCharge).toBe("number");
  });
});
