import UrduFont from "@/constants/UrduFont";
import { SaleItemProps } from "@/props/SaleProps";
import React from "react";
import SalesByDateListItem from "./SalesByDateListItem";

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
          <SalesByDateListItem key={sale._id} index={index} {...sale} />
        ))}
      </tbody>
    </table>
  );
};

export default SalesByDateList;
