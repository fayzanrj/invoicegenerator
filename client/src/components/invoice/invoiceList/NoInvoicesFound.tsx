import UrduFont from "@/constants/UrduFont";
import React from "react";

const NoInvoicesFound = () => {
  return (
    <tr className="col-span-full">
      <td
        colSpan={5}
        className={`${UrduFont} font-sans font-semibold text-xl py-4 text-center`}
      >
        کوئی بل نہیں ملا
      </td>
    </tr>
  );
};

export default NoInvoicesFound;
