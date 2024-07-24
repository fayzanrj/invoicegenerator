'use client'
import React from "react";
import Loader from "./Loader";
import ScreenModal from "./ScreenModal";

const ScreenLoader = () => {
  return (
    <ScreenModal isLoader>
      <Loader color="#000000" />
    </ScreenModal>
  );
};

export default ScreenLoader;
