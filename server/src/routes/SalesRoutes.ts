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

// Route to get latest sales list page by page
// This route is protected by the authorised middleware, meaning only authroised users can access it
// /api/v1/sales/getSales?page=number
router.get("/getSales", authorised, salesControllers.getSales);

// Route to get sales record of a specific month
// This route is protected by the authorised middleware, meaning only authroised users can access it
// /api/v1/sales/getMonthlySalesStats
router.get(
  "/getMonthlySalesStats/:id",
  authorised,
  isValidId,
  salesControllers.getMonthlySalesStats
);

// Route to get sales for a specifc date
// This route is protected by the authorised middleware, meaning only authroised users can access it
// /api/v1/sales/getSalesByDate
router.get("/getSalesByDate", authorised, salesControllers.getSalesByDate);

// Route to get monthly sales data for invoice of a specific month and user
// This route is protected by the authorised middleware, meaning only authorized users can access it
// /api/v1/sales/getMonthlySalesInvoiceData
router.get(
  "/getMonthlySalesInvoiceData/:id",
  authorised,
  isValidId,
  salesControllers.getMonthlySalesInvoiceData
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

// Route to delete a sale
// This route is protected by the authorised middleware, meaning only authroised users can access it
// This route also uses validateSalesData middleware to make sure all required fields are provided
// /api/v1/sales/deleteSale/:id
router.delete(
  "/deleteSale/:id",
  authorised,
  isValidId,
  salesControllers.deleteSale
);

export default router;
