import express from "express";
import adminAuthorised from "../middlewares/AdminAuthorised";
import * as salesControllers from "../controllers/SalesControllers";
import authorised from "../middlewares/Authorised";
import validateSalesData from "../middlewares/ValidateSalesData";

const router = express.Router();

// Route to save a sale
// This route is protected by the authorised middleware, meaning only authroised users can access it
// This route also uses validateSalesData middleware to make sure all required fields are provided
// /api/v1/sales/addSale
router.post("/addSales", authorised, validateSalesData, salesControllers.addSales);

export default router;
