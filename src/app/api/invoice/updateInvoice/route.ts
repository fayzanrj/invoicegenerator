import connectToDB from "@/app/connectToDB";
import {
  ThrowIncompleteError,
  ThrowNotFoundError,
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/server/ResponseErrors";
import validateInvoiceData from "@/libs/server/ValidateInvoiceData";
import { verifyUser } from "@/libs/server/VerifyUser";
import Invoice from "@/models/InvoiceModel";
import InvoiceNumber from "@/models/InvoiceNumberModel";
import User from "@/models/UserModel";
import InvoiceProps from "@/props/InvoiceProps";
import { NextRequest, NextResponse } from "next/server";

// POST method for adding a new user
export const POST = async (req: NextRequest) => {
  try {
    // Verifying user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user || !user.userId) {
      return ThrowUnAuthorizedError();
    }

    // Connecting to the database
    const isConnected = await connectToDB();
    if (!isConnected) throw ThrowServerError();

    // Finding user
    const userDetails = await User.findById(user.userId);

    if (!userDetails) {
      return ThrowUnAuthorizedError();
    }

    const data: InvoiceProps = await req.json();

    // Checing if provided data is valid
    const isDataValid = await validateInvoiceData(data);
    if (!isDataValid) {
      return ThrowIncompleteError();
    }

    // Saving invoice
    const invoice = await Invoice.findOneAndUpdate(
      {
        invoiceNumber: data.invoiceNumber,
      },
      {
        ...data,
      }
    );
    // Response
    return NextResponse.json(
      { message: "Invoice Saved", invoiceNumber: invoice.invoiceNumber },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return ThrowServerError();
  }
};
