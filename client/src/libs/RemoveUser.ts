import React from "react";
import handleApiError from "./HandleApiError";
import axios, { AxiosRequestHeaders } from "axios";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

// Function to remove user with api call
const removeUser = async (
  selectedUser: string,
  headers: any,
  loggedInUserId: string
) => {

  // Validating user ids
  if (selectedUser.length !== 24 || loggedInUserId.length !== 24) {
    toast.error("Some error occured");
    return;
  }

  try {
    // API CALL
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/removeUser/${selectedUser}`,
      {
        headers,
      }
    );
    toast.success(res.data.message);
    if (selectedUser === loggedInUserId) signOut();
  } catch (error) {
    console.error(error);
    handleApiError(error);
  }
};

export default removeUser;
