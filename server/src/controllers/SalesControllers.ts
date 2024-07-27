import { Request, Response } from "express";
import {
  SaleIncomingDataItemProps,
  SaleProps,
  SalesIncomingDataProps,
} from "../props/SalesProps";
import aggregateItemQuantities from "../libs/AggregateItemQuantities";
import extractMonthFromDate from "../libs/ExtractMonthFromDate";
import {
  ThrowBadRequest,
  ThrowNotFoundError,
  ThrowServerError,
} from "../libs/ResponseErrors";
import sortAndAggregateItems, {
  sortItemsByDate,
} from "../libs/SortAndAggregateItems";
import Customer from "../models/CustomerModel";
import MonthlySale from "../models/MonthlySaleModel";
import Sale from "../models/SaleModel";
import { InvoiceItemProps } from "props/InvoiceProps";

/**
 * Controller to add a sale.
 * @param req Request object from Express.
 * @param res Response object from Express.
 * @returns A JSON response containing message.
 */
export const addSales = async (req: Request, res: Response) => {
  try {
    // Destructuring
    const { customer, items }: SalesIncomingDataProps = req.body;

    // Preparing sale items for batch insertion
    const saleItems = items.map((item: SaleIncomingDataItemProps) => ({
      details: item.details,
      date: item.date,
      quantity: item.quantity,
      builtyNo: item.builtyNo,
      month: null, // Setting month to null initially; will update it later after getting month id
      customer,
    }));

    // Batch inserting sale items into the database
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
        try {
          // Finding or creating monthly sale record
          let monthlySales = await MonthlySale.findOne({ monthName: month });

          if (monthlySales) {
            monthlySales.sales.push(...salesByMonth[month]);
            await monthlySales.save();
          } else {
            monthlySales = await MonthlySale.create({
              monthName: month,
              sales: salesByMonth[month],
            });
          }

          // Updating sale items with the month reference
          await Sale.updateMany(
            { _id: { $in: salesByMonth[month] } },
            { month: monthlySales._id }
          );
        } catch (error) {
          console.error(
            `Error updating or creating monthly sales for ${month}:`,
            error
          );
          throw error;
        }
      }
    );

    // Waiting for all monthly sales updates to complete
    await Promise.all(monthlySalesPromises);

    // Response
    return res.status(200).json({ message: "Sales added successfully" });
  } catch (error) {
    console.error("Error adding sales:", error);
    return ThrowServerError(res);
  }
};

/**
 * Controller to get months list.
 * @param req Request object from Express.
 * @param res Response object from Express.
 * @returns A JSON response containing months list.
 */
export const getMonthsList = async (req: Request, res: Response) => {
  try {
    const saleMonths = await MonthlySale.find(
      {},
      { monthName: true, _id: true }
    );

    // Response
    return res.status(200).json({ saleMonths });
  } catch (error) {
    console.error(error);
    return ThrowServerError(res);
  }
};

/**
 * Controller to get sales page by oage.
 * @param req Request object from Express.
 * @param res Response object from Express.
 * @returns A JSON response containing the sales data.
 */
export const getSales = async (req: Request, res: Response) => {
  try {
    // Destructuring
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = 20;

    // Calculating offset
    const skip = (page - 1) * limit;

    // Finding the total count of sales
    const totalSales = await Sale.countDocuments();

    // Finding sales
    const sales = await Sale.find().populate("customer").skip(skip).limit(limit);

    // Checking if it's the last page
    const isLastPage = page * limit >= totalSales;

    // Response
    return res.status(200).json({ sales, isLastPage });
  } catch (error) {
    console.error(error);
    return ThrowServerError(res);
  }
};

/**
 * Controller to get sales by customerId.
 * @param req Request object from Express.
 * @param res Response object from Express.
 * @returns A JSON response containing the sales data.
 */
export const getSalesByCustomerId = async (req: Request, res: Response) => {
  try {
    // Destructuring
    const { customerId } = req.params as { customerId: string };
    const { monthId } = req.query as { monthId: string };

    // Validating ids
    if (
      !customerId ||
      !monthId ||
      customerId.length !== 24 ||
      monthId.length !== 24
    ) {
      return ThrowBadRequest(res, "Invalid Customer or Month Id");
    }

    // Finding customer
    const customer = await Customer.findById(customerId);
    if (!customer) return ThrowNotFoundError(res, "No customer found");

    // Finding sales
    const sales = await Sale.find({ customer: customerId, month: monthId });
    const sortedSales = sortAndAggregateItems(sales);

    // Response
    return res.status(200).json({ customer, sales: sortedSales });
  } catch (error) {
    console.error(error);
    return ThrowServerError(res);
  }
};

/**
 * Controller to get monthly sale stats of a specific month by id.
 * @param req Request object from Express.
 * @param res Response object from Express.
 * @returns A JSON response containing month and sales stats.
 */
export const getMonthlySalesStats = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Finding monthly sales
    const monthlySales = await MonthlySale.findById(id).populate("sales");
    if (!monthlySales)
      return ThrowNotFoundError(res, "Monthly sales record not found");

    // Aggregating items
    const aggregatedItems = aggregateItemQuantities(monthlySales.sales);

    // Response
    return res
      .status(200)
      .json({ month: monthlySales.monthName, sales: aggregatedItems });
  } catch (error) {
    console.error(error);
    return ThrowServerError(res);
  }
};

/**
 * Controller to get monthly sales data for invoice of a specific month and user
 * @param req Request object from Express.
 * @param res Response object from Express.
 * @returns A JSON response containing month and sales stats.
 */
export const getMonthlySalesInvoiceData = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { customerId } = req.query as { customerId: string };

    // Validating ids
    if (!customerId || !id || customerId.length !== 24 || id.length !== 24)
      return ThrowBadRequest(res, "Invalid Customer or Month Id");

    // Fetching customer
    const customer = await Customer.findById(customerId);
    if (!customer) return ThrowNotFoundError(res, "No customer found");

    // Fetching monthly sales
    const monthlySales = await MonthlySale.findById(id).populate("sales");
    if (!monthlySales) return ThrowNotFoundError(res, "No monthly sales found");

    const sortedSales = await sortItemsByDate(monthlySales.sales);

    // Filtering and converting sales for the specified customer
    const customerSales: InvoiceItemProps[] = sortedSales
      .filter((sale: SaleProps) => sale.customer.toString() === customerId)
      .map((sale: SaleProps) => ({
        _id: sale._id.toString(),
        details: sale.details,
        quantity: sale.quantity,
        rate: 0,
        total: 0,
        date: sale.date,
        builtyNo: sale.builtyNo,
      }));

    // Returning response
    return res.status(200).json({
      customer: customer.name,
      month: monthlySales.monthName,
      sales: customerSales,
    });
  } catch (error) {
    console.error(error);
    return ThrowServerError(res);
  }
};

/**
 * Controller to get sales for a specific date.
 * @param req Request object from Express.
 * @param res Response object from Express.
 * @returns A JSON response containing month and sales stats.
 */
export const getSalesByDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;

    const sales = await Sale.find({
      date,
    }).populate("customer");

    // Response
    return res.status(200).json({ sales });
  } catch (error) {
    console.error(error);
    return ThrowServerError(res);
  }
};
