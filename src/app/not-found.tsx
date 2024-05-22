import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="CENTER text-center">
      <p className="text-2xl font-semibold my-5">404 - NO SUCH PAGE FOUND</p>
      <Link href={"/dashboard"}>Go to dashboard</Link>
    </div>
  );
};

export default NotFound;
