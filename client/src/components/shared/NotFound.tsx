import React from "react";
import BackButton from "./BackButton";
import Link from "next/link";

interface NotFoundProps {
  label: string;
  href: string;
}

const NotFound: React.FC<NotFoundProps> = ({ href, label }) => {
  return (
    <main className="p-4">
      <BackButton />
      <div className="CENTER text-center">
        <p className="text-2xl font-semibold my-5">NO INVOICE FOUND</p>
        <Link href={"/dashboard"}>Go to dashboard</Link>
      </div>
    </main>
  );
};

export default NotFound;
