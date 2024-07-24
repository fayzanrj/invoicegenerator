import { Request, Response, NextFunction } from "express";
import { ThrowIncompleteError } from "../libs/ResponseErrors";
import SalesDataProps from "props/SalesDataProps";

// Helper function to check if a value is a non-empty string
const isNonEmptyString = (value: any): boolean =>
  typeof value === "string" && value.trim() !== "";

const validateSalesData = (req: Request, res: Response, next: NextFunction) => {
  const { customer, items }: SalesDataProps = req.body;

  // Check the main fields of the salesData object
  if (!isNonEmptyString(customer)) {
    return ThrowIncompleteError(res);
  }

  if (!Array.isArray(items) || items.length === 0) {
    return ThrowIncompleteError(res);
  }

  // Check each item in the items array
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (!isNonEmptyString(item.item)) {
      return ThrowIncompleteError(res);
    }

    if (!isNonEmptyString(item.date)) {
      return ThrowIncompleteError(res);
    }

    if (typeof item.quantity !== "number" || item.quantity <= 0) {
      return ThrowIncompleteError(res);
    }
  }

  // If all validations pass, moving to controller
  next();
};

export default validateSalesData;
