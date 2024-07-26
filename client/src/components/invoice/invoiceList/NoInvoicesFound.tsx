import React from "react";

const NoInvoicesFound = () => {
  return (
    <tr>
      <td
        colSpan={4}
        className="text-center py-10 text-xl font-sans font-semibold"
      >
        NO INVOICES FOUND
      </td>
    </tr>
  );
};

export default NoInvoicesFound;
