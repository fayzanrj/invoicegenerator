import {
  ThrowIncompleteError,
  ThrowNotFoundError,
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/server/ResponseErrors";
import { verifyUser } from "@/libs/server/VerifyUser";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectToDB from "@/app/connectToDB";

export const PUT = async (req: NextRequest) => {
  try {
    // Verifying user by verifying access token
    const user = verifyUser(req);

    // If access token is not verified
    if (!user || !user.userId) {
      return ThrowUnAuthorizedError();
    }

    const data = await req.json();
    const { oldPassword, newPassword } = data;
    if (!oldPassword || !newPassword) {
      return ThrowIncompleteError();
    }

    // Connecting to the database
    const isConnected = await connectToDB();
    if (!isConnected) throw ThrowServerError();

    // Finding user
    const userDetails = await User.findById(user.userId);
    // If no user found
    if (!userDetails) {
      return ThrowNotFoundError("No user found");
    }

    // Comparing password
    const isPasswordCorrect = bcrypt.compareSync(
      oldPassword,
      userDetails.password
    );

    // If password does not match
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Incorrect old password" },
        { status: 401 }
      );
    }

    // Hashing the new password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(newPassword, saltRounds);

    // Updating new password in the database
    await User.findByIdAndUpdate(user.userId, {
      password: hashedPassword,
    });

    // Response
    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return ThrowServerError();
  }
};
