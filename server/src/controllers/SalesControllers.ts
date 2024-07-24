import { Request, Response } from "express";
import { ThrowServerError } from "../libs/ResponseErrors";
import SalesDataProps from "props/SalesDataProps";
import Sale from "../models/SaleModel";
import extractMonthFromDate from "../libs/ExtractMonthFromDate";
import MonthlySale from "../models/MonthlySaleModel";

/**
 * Controller to add a sale.
 * @param req Request object from Express.
 * @param res Response object from Express.
 * @returns A JSON response containinmg message.
 */
export const addSales = async (req: Request, res: Response) => {
  try {
    // Destructuring
    const { customer, items }: SalesDataProps = req.body;

    // Preparing sale items for batch insertion
    const saleItems = items.map((item) => {
      delete item.id;
      const month = extractMonthFromDate(item.date);
      return {
        ...item,
        month,
        customer,
      };
    });

    // Batch inserting sale items in database
    const createdSaleItems = await Sale.insertMany(saleItems);

    // Grouping sale items by month
    const salesByMonth: Record<string, string[]> = {};
    createdSaleItems.forEach((item) => {
      const month = extractMonthFromDate(item.date);
      if (!salesByMonth[month]) {
        salesByMonth[month] = [];
      }
      salesByMonth[month].push(item._id.toString());
    });

    // Updating monthly sales
    const monthlySalesPromises = Object.keys(salesByMonth).map(
      async (month) => {
        // Finding sale month
        const monthlySales = await MonthlySale.findOne({ monthName: month });

        // If sale month exists
        if (monthlySales) {
          monthlySales.sales.push(...salesByMonth[month]);
          return monthlySales.save();
        } else {
          // If sale month doesnt exist
          return MonthlySale.create({
            monthName: month,
            sales: salesByMonth[month],
          });
        }
      }
    );

    // Waiting for monthly sales to be stored in database
    await Promise.all(monthlySalesPromises);

    // Response
    return res.status(200).json({ message: "Sales added successfully" });
  } catch (error) {
    console.error(error);
    return ThrowServerError(res);
  }
};
