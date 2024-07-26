import UrduFont from "@/constants/UrduFont";
import { SaleItemProps } from "@/props/SaleProps";
import React from "react";
import SalesByDateListItem from "./SalesByDateListItem";
import { SalesByDateTableHeading } from "@/components/shared/TableHeaders";

// Props
interface SalesByDateListProps {
  sales: SaleItemProps[];
}

const SalesByDateList: React.FC<SalesByDateListProps> = ({ sales }) => {
  return (
    <section>
      <table className={`${UrduFont} w-full`}>
        <SalesByDateTableHeading />

        <tbody>
          {sales.map((sale, index) => (
            <SalesByDateListItem key={sale._id} index={index} {...sale} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SalesByDateList;
