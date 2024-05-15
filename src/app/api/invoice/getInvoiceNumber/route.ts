import connectToDB from "@/app/connectToDB";
import {
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/server/ResponseErrors";
import { verifyUser } from "@/libs/server/VerifyUser";
import InvoiceNumber from "@/models/InvoiceNumberModel";
import { NextRequest, NextResponse } from "next/server";

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

    // Getting invoice number
    const latestInvoiceNumber = await InvoiceNumber.findOne();

    // Adding 1 t latest invoice number
    latestInvoiceNumber.number += 1;

    // Response
    return NextResponse.json(latestInvoiceNumber);
  } catch (error) {
    console.log(error);
    return ThrowServerError();
  }
};
