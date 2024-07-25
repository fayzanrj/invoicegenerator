import UrduFont from "@/constants/UrduFont";
import { SaleItemProps } from "@/props/SaleProps";
import React from "react";

// Props
interface SalesByDateListProps {
  sales: SaleItemProps[];
}

// Table heading
const TableHead = () => (
  <thead>
    <tr>
      <th className="bg-black text-white w-1/5 py-3">بلٹی نمبر</th>
      <th className="bg-black text-white w-1/5">مقدار</th>
      <th className="bg-black text-white w-1/5">تفصیل</th>
      <th className="bg-black text-white w-1/5">خریدار</th>
      <th className="bg-black text-white w-1/5">نمبر</th>
    </tr>
  </thead>
);

const SalesByDateList: React.FC<SalesByDateListProps> = ({ sales }) => {
  return (
    <table className={`${UrduFont} w-full`}>
      <TableHead />

      <tbody>
        {sales.map((sale, index) => (
          <tr key={sale._id}>
            <td className="w-1/5 text-center font-sans py-3">
              {sale.builtyNo}
            </td>
            <td className="w-1/5 text-center font-sans">{sale.quantity}</td>
            <td className="w-1/5 text-center">{sale.details}</td>
            <td className="w-1/5 text-center py-3"> {sale.customer?.name}</td>
            <td className="w-1/5 text-center py-3 font-sans"> {index + 1}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SalesByDateList;
