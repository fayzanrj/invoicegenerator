import { Request, Response, NextFunction } from "express";
import { InvoiceProps } from "../props/InvoiceProps";
import { ThrowIncompleteError, ThrowServerError } from "../libs/ResponseErrors";

/**
 * Middleware function to validate invoice data.
 * Checks if all required fields are present and if list items have valid types.
 * If validation fails, it throws an Incomplete Data error.
 * @param req Request object from Express containing invoice data in body.
 * @param res Response object from Express.
 * @param next Next function to pass control to the next middleware.
 * @returns Calls the next function if data is valid, otherwise throws a Server Error.
 */
const validateInvoiceData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: InvoiceProps = req.body.invoice;

    // Checking if all required fields are present
    const { buyerName, date, list, total, invoiceType } = data;
    if (!buyerName || !date || !list || !total) {
      return ThrowIncompleteError(res);
    }

    // Checking if list is valid
    if (!Array.isArray(list)) {
      return ThrowIncompleteError(res);
    }

    // Removing _id and checking if each item in the list is valid
    const updatedList = list.map((item) => {
      const { _id, ...rest } = item;
      return rest;
    });

    // Updating req.body.invoice with the modified list
    req.body.invoice.list = updatedList;

    for (const item of updatedList) {
      if (
        typeof item.details !== "string" ||
        typeof item.quantity !== "number" ||
        typeof item.rate !== "number" ||
        typeof item.total !== "number" ||
        item.details === ""
      ) {
        return ThrowIncompleteError(res);
      }
    }

    if (
      invoiceType !== "circle" &&
      invoiceType !== "pathi" &&
      invoiceType !== "waterset"
    ) {
      return ThrowIncompleteError(res);
    }

    // Moving to the next middleware or controller
    next();
  } catch (error) {
    console.error(error);
    ThrowServerError(res);
  }
};

export default validateInvoiceData;
