import UrduFont from "@/constants/UrduFont";
import React from "react";

const NoCustomerFound = () => {
  return (
    <tr className="col-span-full">
      <td
        colSpan={4}
        className={`${UrduFont} font-semibold text-xl py-4 text-center`}
      >
        کوئی گاہک نہیں ملا
      </td>
    </tr>
  );
};

export default NoCustomerFound;
