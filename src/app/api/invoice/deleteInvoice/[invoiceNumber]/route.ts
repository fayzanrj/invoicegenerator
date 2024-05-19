import connectToDB from "@/app/connectToDB";
import {
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/server/ResponseErrors";
import { verifyUser } from "@/libs/server/VerifyUser";
import Invoice from "@/models/InvoiceModel";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { invoiceNumber: string } }
) => {
  try {
    const { invoiceNumber } = params;
    // Checking is invoiceNumber is provided
    if (!invoiceNumber) {
      return ThrowServerError();
    }

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
    // If requesting user is not an admin
    if (!userDetails || userDetails.role !== "admin") {
      return ThrowUnAuthorizedError();
    }

    // Deleting invoice
    const deletedInvoice = await Invoice.deleteOne({
      invoiceNumber,
    });

    if (!deletedInvoice) {
      return ThrowServerError();
    }

    // Response
    return NextResponse.json(
      { message: "Invoice has been deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return ThrowServerError();
  }
};
