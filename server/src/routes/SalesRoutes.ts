import express from "express";
import * as salesControllers from "../controllers/SalesControllers";
import authorised from "../middlewares/Authorised";
import isValidId from "../middlewares/IsValidId";
import validateSalesData from "../middlewares/ValidateSalesData";

const router = express.Router();

// Route to get months list
// This route is protected by the authorised middleware, meaning only authroised users can access it
// /api/v1/sales/getMonthsList
router.get("/getMonthsList", authorised, salesControllers.getMonthsList);

// Route to get sales record of a specific month
// This route is protected by the authorised middleware, meaning only authroised users can access it
// /api/v1/sales/getMonthlySalesStats
router.get(
  "/getMonthlySalesStats/:id",
  authorised,
  isValidId,
  salesControllers.getMonthlySalesStats
);

// Route to get a customer's stats of a specific month
// This route is protected by the authorised middleware, meaning only authroised users can access it
// /api/v1/sales/getSalesByCustomerId/:customerId?monthId=monthId
router.get(
  "/getSalesByCustomerId/:customerId",
  authorised,
  salesControllers.getSalesByCustomerId
);

// Route to save a sale
// This route is protected by the authorised middleware, meaning only authroised users can access it
// This route also uses validateSalesData middleware to make sure all required fields are provided
// /api/v1/sales/addSale
router.post(
  "/addSales",
  authorised,
  validateSalesData,
  salesControllers.addSales
);

export default router;
