import { Request, response, Response } from "express";
import Customer from "../models/CustomerModel";
import {
  ThrowBadRequest,
  ThrowIncompleteError,
  ThrowServerError,
} from "../libs/ResponseErrors";
import CustomerNumber from "../models/CustomerNumberModel";

/**
 * Controller to get customers list
 * @param req Request object from Express.
 * @param res Response object from Express.
 * @returns A JSON response containing an array of customers.
 */
export const getCustomers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = 20;

    // Calculating offset
    const skip = (page - 1) * limit;

    // Finding the total count of invoices based on variant
    const totalCustomers = await Customer.countDocuments({ isActive: true });

    // Finding customer based on pagination
    const customers = await Customer.find({
      isActive: true,
    })
      .sort({ customerNo: 1 })
      .skip(skip)
      .limit(limit);

    // Check if it's the last page
    const isLastPage = page * limit >= totalCustomers;

    // Response
    return res.status(200).json({ customers, isLastPage });
  } catch (error) {
    console.error(error);
    return ThrowServerError(res);
  }
};

/**
 * Controller to search for a customer
 * @param req Request object from Express.
 * @param res Response object from Express.
 * @returns A JSON response containing an array of customers.
 */
export const searchCustomer = async (req: Request, res: Response) => {
  try {
    // Destructuring
    const { q } = req.query as {
      q: string;
    };

    // Finding customer based on query
    const customers = await Customer.find({
      name: { $regex: q, $options: "i" },
      isActive: true,
    }).limit(20);

    // Response
    res.status(200).json({ customers });
  } catch (error) {
    console.error(error);
    return ThrowServerError(res);
  }
};

/**
 * Controller to add a new customer.
 * @param req Request object from Express.
 * @param res Response object from Express.
 * @returns A JSON response containing message and newly added customer.
 */
export const addCustomer = async (req: Request, res: Response) => {
  try {
    // Destructuring
    let { customerName } = req.body as { customerName: string };

    // Validating customerName
    if (!customerName || customerName.length < 3)
      return ThrowIncompleteError(res);

    // Removing extra spaces from customerName
    customerName = customerName.trim();

    // Checking if customer already exists
    const customerAlreadyExists = await Customer.findOne({
      customerName,
    });

    if (customerAlreadyExists)
      return ThrowBadRequest(res, "CustomerName already exists");

    const id = await CustomerNumber.findOne();
    const latestNumber = id.number + 1;

    // Creating new customerName
    const newCustomer = await Customer.create({
      name: customerName,
      isActive: true,
      customerNo: latestNumber,
    });

    if (!newCustomer) return ThrowServerError(res);

    await CustomerNumber.findByIdAndUpdate(id._id, {
      number: latestNumber,
    });
    return res.status(201).json({
      message: "Customer has been added",
      customer: newCustomer,
    });
  } catch (error) {
    console.error(error);
    return ThrowServerError(res);
  }
};

/**
 * Controller to deactivate a customer (set isActive to false)
 * @param req Request object from Express.
 * @param res Response object from Express.
 * @returns A JSON response containing message and the updated customer.
 */
export const deactivateCustomer = async (req: Request, res: Response) => {
  try {
    // Destructuring id from request params
    const { id } = req.params as { id: string };

    // Finding the customer by ID
    const customer = await Customer.findById(id);

    if (!customer) return ThrowBadRequest(res, "Customer not found");

    // Setting isActive to false
    customer.isActive = false;

    // Saving the updated customer
    const updatedCustomer = await customer.save();

    if (!updatedCustomer) return ThrowServerError(res);

    return res.status(200).json({
      message: "Customer has been deactivated",
    });
  } catch (error) {
    console.error(error);
    return ThrowServerError(res);
  }
};
