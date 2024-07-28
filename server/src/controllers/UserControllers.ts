import { Request, Response } from "express";
import {
  ThrowServerError,
  ThrowUnAuthorizedError,
} from "../libs/ResponseErrors";
import User from "../models/UserModel";
import UserProps from "props/UserProps";

/**
 * Controller to fetch all users.
 * @param req Request object from Express.
 * @param res Response object from Express.
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    // Finding all users
    const users = await User.find().select({
      _id: true,
      username: true,
    });

    // Returning response with users array
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    ThrowServerError(res); // Returning server error for any exception
  }
};

/**
 * Controller to remove a user by ID.
 * @param req Request object from Express, containing `params` with `id` of the user to be deleted.
 * @param res Response object from Express.
 */
export const removeUser = async (req: Request, res: Response) => {
  try {
    // Destructuring
    const { id: userId } = req.params;
    const user = req.body.user;
    
    // If user is not himself or admin
    if (user._id.toString() !== userId && user.role !== "admin")
      return ThrowUnAuthorizedError(res);

    // Deleting user
    const deletedUser = await User.findByIdAndDelete(userId);

    // If user is not deleted
    if (!deletedUser) {
      return ThrowServerError(res); // Returning server error
    }

    // Returning success message
    return res.status(200).json({ message: "User has been removed" });
  } catch (error) {
    console.error(error);
    ThrowServerError(res); // Returning server error for any exception
  }
};
