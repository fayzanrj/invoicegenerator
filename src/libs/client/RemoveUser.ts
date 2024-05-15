import React from "react";
import handleApiError from "../server/HandleApiError";
import axios, { AxiosRequestHeaders } from "axios";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

const removeUser = async (
  selectedUser: string,
  headers: any,
  loggedInUserId: string
) => {
  if (selectedUser.length !== 24 || loggedInUserId.length !== 24) {
    toast.error("Some error occured");
    return;
  }

  try {
    const res = await axios.delete(`/api/user/removeUser/${selectedUser}`, {
      headers,
    });
    toast.success(res.data.message);
    if (selectedUser === loggedInUserId) signOut();
  } catch (error) {
    console.error(error);
    handleApiError(error);
  }
};

export default removeUser;
