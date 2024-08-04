import { Request, Response } from "express";
import { ThrowBadRequest, ThrowServerError } from "../libs/ResponseErrors";
import Invoice from "../models/InvoiceModel";
import InvoiceNumber from "../models/InvoiceNumberModel";
import { InvoiceTypeProps } from "props/InvoiceProps";

type variantProps = "saved" | "drafts";

/**
 * Controller to get the latest invoice number.
 * @param req Request object from Express.
 * @param res Response object from Express.
 */
export const getInvoiceNumber = async (req: Request, res: Response) => {
  try {
    // Getting latest invoice number
    const latestInvoiceNumber = await InvoiceNumber.findOne();

    // Adding 1 to latest invoice number
    latestInvoiceNumber.number += 1;

    // Response
    return res.status(200).json(latestInvoiceNumber);
  } catch (error) {
    console.error(error);
    ThrowServerError(res);
  }
};

/**
 * Controller to get invoices by type (waterset, circle, pathi).
 * @param req Request object from Express containing the type in params.
 * @param res Response object from Express.
 */
export const getInvoicesByType = async (req: Request, res: Response) => {
  try {
    const type = req.params.type as InvoiceTypeProps;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = 20;

    // Validating type
    if (type !== "waterset" && type !== "circle" && type !== "tapayi") {
      return ThrowBadRequest(res, "Invalid request");
    }

    // Calculating offset
    const skip = (page - 1) * limit;

    // Finding the total count of invoices based on type
    const totalInvoices = await Invoice.countDocuments({ invoiceType : type  });

    // Finding invoices based on type with pagination
    const invoices = await Invoice.find({ invoiceType : type, isDraft : false })
      .sort({ invoiceNumber: -1 })
      .skip(skip)
      .limit(limit);

    // Checking if it's the last page
    const isLastPage = page * limit >= totalInvoices;

    // Response
    return res.status(200).json({ invoices, isLastPage });
  } catch (error) {
    console.error(error);
    ThrowServerError(res);
  }
};

/**
 * Controller to get invoices by variant (saved or drafts).
 * @param req Request object from Express containing the variant in params.
 * @param res Response object from Express.
 */
export const getInvoicesByVariant = async (req: Request, res: Response) => {
  try {
    const variant = req.params.variant as variantProps;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = 20;

    // Validating variant
    if (variant !== "drafts" && variant !== "saved") {
      return ThrowBadRequest(res, "Invalid request");
    }

    // Calculating offset
    const skip = (page - 1) * limit;

    // Finding the total count of invoices based on variant
    const totalInvoices = await Invoice.countDocuments({
      isDraft: variant === "drafts",
    });

    // Finding invoices based on variant with pagination
    const invoices = await Invoice.find({
      isDraft: variant === "drafts",
    })
      .sort({ invoiceNumber: -1 })
      .skip(skip)
      .limit(limit);

    // Checking if it's the last page
    const isLastPage = page * limit >= totalInvoices;

    // Response
    return res.status(200).json({ invoices, isLastPage });
  } catch (error) {
    console.error(error);
    ThrowServerError(res);
  }
};

/**
 * Controller to get an invoice by invoice number.
 * @param req Request object from Express containing the invoice number in params.
 * @param res Response object from Express.
 */
export const getInvoice = async (req: Request, res: Response) => {
  try {
    // Destruturing
    const { invoiceNumber } = req.params;

    // Parsing invoiceNumber
    const parsedNumber = Number.parseInt(invoiceNumber);
    if (isNaN(parsedNumber)) {
      return ThrowBadRequest(res, "Invalid invoice number");
    }

    // Finding invoice
    const invoice = await Invoice.findOne({
      invoiceNumber: parsedNumber,
    });

    return res.status(200).json({ invoice });
  } catch (error) {
    console.error(error);
    ThrowServerError(res);
  }
};

/**
 * Controller to search for invoices based on search type and queyr
 * @param req Request object from Express.
 * @param res Response object from Express.
 */

export const searchInvoices = async (req: Request, res: Response) => {
  try {
    //  Destructuring
    const { q, type } = req.query as {
      q: string;
      type: "invoiceNumber" | "date" | "buyer";
    };

    let invoices;

    // Finding invoices based on qeury by determing type of search
    switch (type) {
      case "invoiceNumber":
        const invoiceNumberQuery = Number(q);
        if (isNaN(invoiceNumberQuery)) {
          invoices = [];
        } else {
          invoices = await Invoice.find({
            invoiceNumber: invoiceNumberQuery,
          }).limit(20);
        }
        break;
      case "buyer":
        invoices = await Invoice.find({
          buyerName: { $regex: q, $options: "i" },
        }).limit(20);
        break;
      case "date":
        invoices = await Invoice.find({
          date: q,
        }).limit(40);
        break;
      default:
        invoices = [];
    }

    // Response
    res.status(200).json({ invoices });
  } catch (error) {
    console.error(error);
    return ThrowServerError(res);
  }
};

/**
 * Controller to save a new invoice.
 * @param req Request object from Express containing invoice data in body and user data.
 * @param res Response object from Express.
 */
export const saveInvoice = async (req: Request, res: Response) => {
  try {
    // Destructuring
    const { invoice, user } = req.body;

    // Getting latest invoice number
    const latestInvoiceNumber = await InvoiceNumber.findOne();

    // Saving new invoice
    const newInvoice = await Invoice.create({
      ...invoice,
      invoiceNumber: latestInvoiceNumber.number + 1,
      createdBy: user.name,
    });

    // Updating latest invoice number
    await InvoiceNumber.findByIdAndUpdate(latestInvoiceNumber._id, {
      number: latestInvoiceNumber.number + 1,
    });

    // Response
    return res.status(200).json({
      message: "Invoice saved",
      invoiceNumber: newInvoice.invoiceNumber,
    });
  } catch (error) {
    console.error(error);
    ThrowServerError(res);
  }
};

/**
 * Controller to delete an invoice by invoice number.
 * @param req Request object from Express containing the invoice number in params.
 * @param res Response object from Express.
 */
export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    // Destructuring
    const { invoiceNumber } = req.params;

    // Parsing invoiceNumber
    const parsedNumber = Number.parseInt(invoiceNumber);
    if (isNaN(parsedNumber)) {
      return ThrowBadRequest(res, "Invalid invoice number");
    }

    // Deleting invoice
    const deletedInvoice = await Invoice.deleteOne({
      invoiceNumber: parsedNumber,
    });

    // If invoice is not deleted
    if (!deletedInvoice) {
      return ThrowServerError(res);
    }

    // Response
    return res.status(200).json({ message: "Invoice deleted" });
  } catch (error) {
    console.error(error);
    ThrowServerError(res);
  }
};

/**
 * Controller to update an invoice.
 * @param req Request object from Express containing updated invoice data in body.
 * @param res Response object from Express.
 */
export const updateInvoice = async (req: Request, res: Response) => {
  try {
    // Destructuring
    const { invoice } = req.body;

    // Updating invoice by invoiceNumber
    const updatedInvoice = await Invoice.findOneAndUpdate(
      { invoiceNumber: invoice.invoiceNumber },
      { ...invoice },
      { new: true }
    );

    // If invoice is not updated
    if (!updatedInvoice) {
      return ThrowServerError(res);
    }
    // Response
    return res.status(200).json({
      message: "Invoice updated",
      invoiceNumber: updatedInvoice.invoiceNumber,
    });
  } catch (error) {
    console.error(error);
    ThrowServerError(res);
  }
};
