import express from "express";
import adminAuthorised from "../middlewares/AdminAuthorised";
import * as customerControllers from "../controllers/CustomerControllers";
import authorised from "../middlewares/Authorised";

const router = express.Router();

// Route to get customer's list
// This route is protected by the authorised middleware, meaning only authroised users can access it
// /api/v1/customers/getAllCustomers
router.get("/getAllCustomers", authorised, customerControllers.getAllCustomers);

// Route to add a new customer
// This route is protected by the adminAuthorised middleware, meaning only admins can access it
// /api/v1/customers/addCustomer
router.post("/addCustomer", adminAuthorised, customerControllers.addCustomer);

export default router;
