import express from "express";
import adminAuthorised from "../middlewares/AdminAuthorised";
import * as customerControllers from "../controllers/CustomerControllers";
import authorised from "../middlewares/Authorised";
import isValidId from "../middlewares/IsValidId";

const router = express.Router();

// Route to get customer's list
// This route is protected by the authorised middleware, meaning only authorized users can access it
// /api/v1/customers/getCustomers
router.get("/getCustomers", authorised, customerControllers.getCustomers);

// Route to search customers 
// This route is protected by the authorised middleware, meaning only authorized users can access it
// /api/v1/customers/searchCustomers
router.get("/searchCustomers", authorised, customerControllers.searchCustomer);

// Route to add a new customer
// This route is protected by the adminAuthorised middleware, meaning only admins can access it
// /api/v1/customers/addCustomer
router.post("/addCustomer", adminAuthorised, customerControllers.addCustomer);

// Route to deactivate a customer
// This route is protected by the adminAuthorised middleware, meaning only admins can access it
// /api/v1/customers/deactivate/:id
router.put("/deactivate/:id", adminAuthorised, isValidId, customerControllers.deactivateCustomer);

export default router;
