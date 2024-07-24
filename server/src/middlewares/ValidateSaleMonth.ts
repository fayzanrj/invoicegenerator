import { NextFunction, Request, Response } from "express";
import { ThrowBadRequest } from "../libs/ResponseErrors";
import { lowerCasedMonths, months } from "../constants/Months";

const validateMonth = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  // Destructuring
  const { month } = req.query as { month: string };

  // Checking if the month parameter is present and is a string
  if (!month || typeof month !== "string") {
    return ThrowBadRequest(
      res,
      "Month parameter is required and must be a string."
    );
  }

  // Splitting month
  const splittedMonth = month.split("-");

  // Ensuring the month parameter is in the correct format
  if (splittedMonth.length !== 2) {
    return ThrowBadRequest(
      res,
      "Month format should be 'Month-Year' (e.g., July-2024)."
    );
  }

  // Destructuring
  const [monthName, year] = splittedMonth;
  //   Converting to lowercase for better us
  const lowercasedMonthName = monthName.toLowerCase();

  // Validating the month name
  if (!lowerCasedMonths.includes(lowercasedMonthName)) {
    return ThrowBadRequest(
      res,
      `Invalid month name. Expected one of: ${months.join(", ")}.`
    );
  }

  // Validating the year
  const yearNumber = parseInt(year, 10);
  if (isNaN(yearNumber) || yearNumber < 2000 || yearNumber > 2100) {
    return ThrowBadRequest(res, "Year must be a number between 1900 and 2100.");
  }

  // Proceeding to the controller
  next();
};

export default validateMonth;
