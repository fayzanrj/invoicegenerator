import { SaleItemProps } from "@/props/SaleProps";
import React from "react";

const LatestSalesListItem: React.FC<SaleItemProps> = ({
  builtyNo,
  date,
  details,
  quantity,
  customer,
  createdAt
}) => {
  return (
    <tr>
      <td className="w-1/6 text-center py-3 border font-sans">{builtyNo}</td>
      <td className="w-1/6 text-center py-3 border font-sans">{quantity}</td>
      <td className="w-1/6 text-center py-3 border">{details}</td>
      <td className="w-1/6 text-center py-3 border">{customer?.name}</td>
      <td className="w-1/6 text-center py-3 border font-sans">{date}</td>
      <td className="w-1/6 text-center py-3 border font-sans">{new Date(createdAt!).toLocaleString()}</td>
    </tr>
  );
};

export default LatestSalesListItem;
