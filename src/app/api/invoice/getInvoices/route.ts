import connectToDB from "@/app/connectToDB";
import {
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/server/ResponseErrors";
import { verifyUser } from "@/libs/server/VerifyUser";
import Invoice from "@/models/InvoiceModel";
import { NextRequest, NextResponse } from "next/server";

// POST method for adding a new user
export const GET = async (req: NextRequest) => {
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

    // Finding all invoices and sorting by latest
    const invoices = await Invoice.find({
      isDraft: false,
    }).sort({ invoiceNumber: -1 });

    // Response
    return NextResponse.json({ invoices });
  } catch (error) {
    console.log(error);
    return ThrowServerError();
  }
};
