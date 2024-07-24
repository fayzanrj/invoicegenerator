import UrduFont from "@/constants/UrduFont";
import { CustomerSalesProps } from "@/props/SaleProps";
import React from "react";

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
              <tr key={itemIndex} className="border-r border-collapse">
                <td className="w-1/3 py-2 text-center">
                  {item.builtyNo || ""}
                </td>
                <td className="w-1/3 py-2 text-center">{item.quantity}</td>
                <td className={`${UrduFont} text-center`}>{item.details}</td>
              </tr>
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
