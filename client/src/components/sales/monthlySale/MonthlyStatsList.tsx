import UrduFont from "@/constants/UrduFont";
import { MonthlyStatItemProps } from "@/props/SaleProps";
import React from "react";
import MonthlySaleStats from "./MonthlySaleStats";
import MonthlyStatsListItem from "./MonthlyStatsListItem";

// Props
interface MonthlyStatsListProps {
  stats: MonthlyStatItemProps[];
}

// Table heading
const TableHead = () => (
  <thead>
    <tr>
      <th className="bg-black text-white w-1/3 py-3">مقدار</th>
      <th className="bg-black text-white w-1/3">تفصیل</th>
      <th className="bg-black text-white w-1/3">نمبر</th>
    </tr>
  </thead>
);

const MonthlyStatsList: React.FC<MonthlyStatsListProps> = ({ stats }) => {
  return (
    <section>
      <table className={`${UrduFont} w-full my-4`}>
        <TableHead />

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
    </section>
  );
};

export default MonthlyStatsList;
