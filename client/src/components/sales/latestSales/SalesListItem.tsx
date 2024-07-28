import ButtonLayout from "@/components/shared/ButtonLayout";
import { SaleItemProps } from "@/props/SaleProps";
import React from "react";
import { MdDelete } from "react-icons/md";
import SaleDeleteButton from "../SaleDeleteButton";

// Props
interface SalesListItemProps extends SaleItemProps {
  handleRemove: (id: string) => void;
}

const SalesListItem: React.FC<SalesListItemProps> = ({
  builtyNo,
  date,
  details,
  quantity,
  customer,
  createdAt,
  _id,
  handleRemove
}) => {
  return (
    <tr>
      <td className="text-center py-3 border font-sans w-[6%]">
        <SaleDeleteButton
          customerName={customer?.name!}
          date={date}
          details={details}
          saleId={_id}
          handleRemove={handleRemove}
        />
      </td>
      <td className="w-[10%] text-center py-3 border font-sans">{builtyNo}</td>
      <td className="w-1/6 text-center py-3 border font-sans">{quantity}</td>
      <td className="w-1/6 text-center py-3 border">{details}</td>
      <td className="w-1/6 text-center py-3 border">{customer?.name}</td>
      <td className="w-1/6 text-center py-3 border font-sans">{date}</td>
      <td className="w-1/6 text-center py-3 border font-sans">
        {new Date(createdAt!).toLocaleString("en-GB", {
          timeZone: "Asia/Karachi",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </td>
    </tr>
  );
};

export default SalesListItem;
