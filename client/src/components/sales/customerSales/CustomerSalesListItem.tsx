import UrduFont from "@/constants/UrduFont";
import { CustomerSalesProps } from "@/props/SaleProps";
import React, { useState } from "react";
import CustomerSalesItem from "./CustomerSalesItem";

const CustomerSalesListItem: React.FC<CustomerSalesProps> = ({
  date,
  items,
}) => {
  return (
    <tr className="border border-collapse">
      {/* ITEM DATA COLUMN */}
      <td colSpan={3} className="w-10/12">
        <table className="w-full">
          <tbody>
            {items.map((item, itemIndex) => (
              <CustomerSalesItem key={item._id} {...item} />
            ))}
          </tbody>
        </table>
      </td>

      {/* ITEM DATE COLUMN */}
      <td colSpan={1} className="text-lg font-sans font-semibold text-center">
        {date}
      </td>
    </tr>
  );
};

export default CustomerSalesListItem;
