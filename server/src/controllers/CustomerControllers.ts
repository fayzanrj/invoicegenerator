import { Request, Response } from "express";
import Customer from "../models/CustomerModel";
import {
  ThrowBadRequest,
  ThrowIncompleteError,
  ThrowServerError,
} from "../libs/ResponseErrors";

/**
 * Controller to get customers list
 * @param req Request object from Express.
 * @param res Response object from Express.
 * @returns A JSON response containing an array of customers.
 */

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find();

    return res.status(200).json({ customers });
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

    // Creating new customerName
    const newCustomer = await Customer.create({
      name: customerName,
      isActive: true,
    });

    if (!newCustomer) return ThrowServerError(res);

    return res.status(201).json({
      message: "Customer has been added",
      customer: newCustomer,
    });
  } catch (error) {
    console.error(error);
    return ThrowServerError(res);
  }
};
