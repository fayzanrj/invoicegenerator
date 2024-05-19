import Link from "next/link";
import React from "react";

const CreateNew = () => {
  return (
    <Link href="/dashboard/createInvoice">
      <button className=" my-1 py-2 px-2 bg-black rounded-md font-semibold text-white NO_PRINT">
        Create new invoice
      </button>
    </Link>
  );
};

export default CreateNew;
