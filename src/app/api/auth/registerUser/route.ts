import connectToDB from "@/app/connectToDB";
import {
  ThrowIncompleteError,
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "@/libs/server/ResponseErrors";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel";
import bcrypt from "bcrypt";
import { verifyUser } from "@/libs/server/VerifyUser";

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
    // If no user found
    if (!userDetails || userDetails.role !== "admin") {
      return ThrowUnAuthorizedError();
    }

    const data = await req.json();
    // Destructuring
    const { name, username, password, role } = data;

    // Checking if all required fields are provided
    if (
      !name ||
      !username ||
      !password ||
      !role ||
      (role !== "editor" && role !== "admin")
    ) {
      return ThrowIncompleteError();
    }

    // Checking if a user already exists with the provided username
    const userExists = await User.findOne({
      username,
    });

    if (userExists) {
      return NextResponse.json(
        { message: "User already exists with this username" },
        { status: 400 }
      );
    }

    // Hashing the password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    // Updating the password in the data object
    data.password = hash;

    // Creating a new user with the hashed password
    const newUser = await User.create({
      ...data,
    });

    if (!newUser) return ThrowServerError();

    return NextResponse.json(
      { message: "User has been added" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return ThrowServerError();
  }
};
