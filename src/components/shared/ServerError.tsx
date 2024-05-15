"use client";
import React from "react";

const ServerError = () => {
  const refreshPage = () => location.reload();

  return (
    <div className="CENTER text-center">
      <p className="text-2xl font-semibold my-5">SOME ERROR OCCURED</p>
      <button onClick={refreshPage} className="py-1 px-2 font-bold text-xl ">
        Refresh
      </button>
    </div>
  );
};

export default ServerError;
