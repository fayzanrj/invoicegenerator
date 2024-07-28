import { SaleItemProps } from "@/props/SaleProps";
import React, { useState } from "react";
import SaleDeleteButton from "../SaleDeleteButton";
import AddBuiltyNumberButton from "../AddBuiltyNumberButton";
import { Span } from "next/dist/trace";
import { MdAdd, MdEdit } from "react-icons/md";

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
  handleRemove,
}) => {
  // State
  const [saleBuiltyNumber, setSaleBuiltyNumber] = useState(builtyNo);

  // Function to add a builty number
  const handleAddBuiltyNumber = (newBuiltyNumber: string) => {
    setSaleBuiltyNumber(newBuiltyNumber);
  };

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
      <td className="w-[10%] text-center font-sans py-3 border">
        <AddBuiltyNumberButton
          saleId={_id}
          builtyNumber={saleBuiltyNumber}
          handleAddBuiltNumber={handleAddBuiltyNumber}
        />
      </td>
      <td className="w-1/5 text-center font-sans border">{quantity}</td>
      <td className="w-1/5 text-center border">{details}</td>
      <td className="w-1/5 text-center py-3 border">{customer?.name}</td>
      <td className="w-1/5 text-center py-3 font-sans border"> {index + 1}</td>
    </tr>
  );
};

export default SalesByDateListItem;
