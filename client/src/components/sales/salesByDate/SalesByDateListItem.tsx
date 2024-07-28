import { SaleItemProps } from "@/props/SaleProps";
import React from "react";
import SaleDeleteButton from "../SaleDeleteButton";

// Props
interface SalesByDateListItemProps extends SaleItemProps {
  index: number;
  handleRemove: (id: string) => void;
}

const SalesByDateListItem: React.FC<SalesByDateListItemProps> = ({
  _id,
  builtyNo,
  details,
  quantity,
  customer,
  index,
  date,
  handleRemove
}) => {
  return (
    <tr key={_id}>
      <td className="w-[6%] text-center font-sans py-3 border">
        <SaleDeleteButton
          customerName={customer?.name!}
          date={date}
          details={details}
          saleId={_id}
          handleRemove={handleRemove}
        />
      </td>
      <td className="w-[10%] text-center font-sans py-3 border">{builtyNo}</td>
      <td className="w-1/5 text-center font-sans border">{quantity}</td>
      <td className="w-1/5 text-center border">{details}</td>
      <td className="w-1/5 text-center py-3 border">{customer?.name}</td>
      <td className="w-1/5 text-center py-3 font-sans border"> {index + 1}</td>
    </tr>
  );
};

export default SalesByDateListItem;
