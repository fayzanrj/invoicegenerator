"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { IoLogInOutline } from "react-icons/io5";

const LogOutButton = () => {
  return (
    <button onClick={() => signOut()}>
      <IoLogInOutline size={"1.74rem"} />
    </button>
  );
};

export default LogOutButton;
