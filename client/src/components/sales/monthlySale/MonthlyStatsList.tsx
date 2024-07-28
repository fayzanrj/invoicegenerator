import { MonthlySalesTableHeading } from "@/components/shared/TableHeaders";
import UrduFont from "@/constants/UrduFont";
import { MonthlyStatItemProps } from "@/props/SaleProps";
import React from "react";
import MonthlyStatsListItem from "./MonthlyStatsListItem";

// Props
interface MonthlyStatsListProps {
  stats: MonthlyStatItemProps[];
  totalSales: number;
}

const MonthlyStatsList: React.FC<MonthlyStatsListProps> = ({
  stats,
  totalSales,
}) => {
  return (
    <section id="print"> 
      <table className={`${UrduFont} w-full my-4`}>
        <MonthlySalesTableHeading />

        {/* TABLE BODY */}
        <tbody>
          {stats.map((stat, index) => (
            <MonthlyStatsListItem
              key={stat.details}
              index={index}
              details={stat.details}
              quantity={stat.quantity}
            />
          ))}
        </tbody>
      </table>

      <table className="w-full my-3">
        <tr>
          <td className="w-1/3 text-center text-xl font-semibold">{totalSales}</td>
          <th className={`${UrduFont} py-3 bg-black text-white w-1/3`}>ٹوٹل</th>
          <td className="w-1/3"></td>
        </tr>
      </table>
    </section>
  );
};

export default MonthlyStatsList;
