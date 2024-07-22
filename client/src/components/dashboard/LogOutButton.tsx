"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { IoLogInOutline } from "react-icons/io5";
import ButtonLayout from "../shared/ButtonLayout";

const LogOutButton = () => {
  return (
    <ButtonLayout
      background="transparent"
      onClick={() => signOut()}
    >
      <IoLogInOutline size={"1.74rem"} color="#000000" />
    </ButtonLayout>
  );
};

export default LogOutButton;
