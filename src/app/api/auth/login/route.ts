import connectToDB from "@/app/connectToDB";
import bcrypt from "bcrypt";
import {
  ThrowIncompleteError,
  ThrowNotFoundError,
  ThrowServerError,
} from "@/libs/server/ResponseErrors";
import User from "@/models/UserModel";
import { signJwtAccessToken } from "@/utilities/Jwt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const { username, password } = data;
    if (!username || !password) return ThrowIncompleteError();

    // Connecting to the database
    const isConnected = await connectToDB();
    if (!isConnected) throw ThrowServerError();

    // Finding user
    const user = await User.findOne({
      username,
    });
    if (!user) return ThrowNotFoundError("Invalid Credentials");

    // Checking password
    const isCorrectPassword = bcrypt.compareSync(password, user.password);
    if (!isCorrectPassword) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 400 }
      );
    }

    // Signing accessToken
    const accessToken = await signJwtAccessToken({
      userId: user.id,
    });

    // Response
    return NextResponse.json(
      {
        user: {
          accessToken,
          _id: user._id,
          name: user.name,
          username: user.username,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return ThrowServerError();
  }
};
