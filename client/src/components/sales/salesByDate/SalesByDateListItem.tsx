import { SaleItemProps } from "@/props/SaleProps";
import Link from "next/link";
import React, { useState } from "react";
import AddBuiltyNumberButton from "../AddBuiltyNumberButton";
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
      <td className="w-1/5 text-center py-3 border"><Link href={`/dashboard/sales/customerSales/${customer?._id}?callbackUrl=${process.env.NEXT_PUBLIC_HOST}/dashboard/sales`}>{customer?.name}</Link></td>
      <td className="w-1/5 text-center py-3 font-sans border"> {index + 1}</td>
    </tr>
  );
};

export default SalesByDateListItem;
