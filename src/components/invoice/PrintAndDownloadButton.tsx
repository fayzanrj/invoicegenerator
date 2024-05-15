"use client";
import React from "react";

const PrintAndDownloadButton = () => {
  // Function to print
  const handlePrint = () => {
    window.print();
  };

  //   const handleDownload = () => {
  //     const element = document.getElementById("pdf-content");
  //   };
  return (
    <>
      {/* <button
        className="py-2 px-2 mx-2 bg-blue-600 rounded-md font-semibold text-white"
        onClick={handleDownload}
      >
        Download Invoice
      </button> */}

      {/* Print button */}
      <button
        onClick={handlePrint}
        className="py-2 px-2 mx-2 bg-blue-600 rounded-md font-semibold text-white"
      >
        Print Invoice
      </button>
    </>
  );
};

export default PrintAndDownloadButton;
