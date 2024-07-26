import { SaleItemProps } from "@/props/SaleProps";
import React from "react";

// Props
interface SalesByDateListItemProps extends SaleItemProps {
  index: number;
}

const SalesByDateListItem: React.FC<SalesByDateListItemProps> = ({
  _id,
  builtyNo,
  details,
  quantity,
  customer,
  createdAt,
  index,
}) => {
  return (
    <tr key={_id}>
      <td className="w-1/5 text-center font-sans py-3">{builtyNo}</td>
      <td className="w-1/5 text-center font-sans">{quantity}</td>
      <td className="w-1/5 text-center">{details}</td>
      <td className="w-1/5 text-center py-3">{customer?.name}</td>
      <td className="w-1/5 text-center py-3 font-sans"> {index + 1}</td>
    </tr>
  );
};

export default SalesByDateListItem;
