import UrduFont from "@/constants/UrduFont";
import { SaleItemProps } from "@/props/SaleProps";
import React, { useState } from "react";
import AddBuiltyNumberButton from "../AddBuiltyNumberButton";

const CustomerSalesItem: React.FC<SaleItemProps> = ({
  _id,
  builtyNo,
  details,
  quantity,
}) => {
  // State
  const [saleBuiltyNumber, setSaleBuiltyNumber] = useState(builtyNo);

  // Function to add a builty number
  const handleAddBuiltyNumber = (newBuiltyNumber: string) => {
    setSaleBuiltyNumber(newBuiltyNumber);
  };

  return (
    <tr className="border-r border-collapse">
      <td className="w-1/3 py-2 text-center">
        <AddBuiltyNumberButton
          saleId={_id}
          builtyNumber={saleBuiltyNumber}
          handleAddBuiltNumber={handleAddBuiltyNumber}
        />
      </td>
      <td className="w-1/3 py-2 text-center">{quantity}</td>
      <td className={`${UrduFont} text-center`}>{details}</td>
    </tr>
  );
};

export default CustomerSalesItem;
