import {
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/server/ResponseErrors";
import { verifyUser } from "@/libs/server/VerifyUser";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectToDB from "@/app/connectToDB";

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

    // Finding user
    const userDetails = await User.findById(user.userId);
    // If no user found or requsting user is not an admi
    if (!userDetails || userDetails.role !== "admin") {
      return ThrowUnAuthorizedError();
    }

    // Finding all users
    const users = await User.find().select({
      _id: true,
      username: true,
    });

    // Response
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.log(error);
    return ThrowServerError();
  }
};
