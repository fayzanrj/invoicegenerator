import connectToDB from "@/app/connectToDB";
import {
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/server/ResponseErrors";
import { verifyUser } from "@/libs/server/VerifyUser";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  try {
    const { userId } = params;
    // Checking is provided userId is valid
    if (userId?.length !== 24) {
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
    // If requesting user's userid is not same as userid of to be deleted user
    if (userDetails._id.toString() !== userId) {
      // If requesting user is not an adming
      if (!userDetails || userDetails.role !== "admin") {
        return ThrowUnAuthorizedError();
      }
    }

    // Deleting user
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return ThrowServerError();
    }

    // Response
    return NextResponse.json(
      { message: "User has been removed" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return ThrowServerError();
  }
};
