"use client";
import React from "react";
import BackButton from "./BackButton";

interface ServerErrorProps {
  label: string;
  href: string;
}

const ServerError: React.FC<ServerErrorProps> = ({ href, label }) => {
  const refreshPage = () => location.reload();

  return (
    <main className="p-4">
      <BackButton label={label} href={href} />
      <div className="CENTER text-center">
        <p className="text-2xl font-semibold my-5">SOME ERROR OCCURED</p>
        <button onClick={refreshPage} className="py-1 px-2 font-bold text-xl ">
          Refresh
        </button>
      </div>
    </main>
  );
};

export default ServerError;
