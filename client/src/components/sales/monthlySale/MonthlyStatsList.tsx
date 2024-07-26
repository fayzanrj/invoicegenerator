import { MonthlySalesTableHeading } from "@/components/shared/TableHeaders";
import UrduFont from "@/constants/UrduFont";
import { MonthlyStatItemProps } from "@/props/SaleProps";
import React from "react";
import MonthlyStatsListItem from "./MonthlyStatsListItem";

// Props
interface MonthlyStatsListProps {
  stats: MonthlyStatItemProps[];
}

const MonthlyStatsList: React.FC<MonthlyStatsListProps> = ({ stats }) => {
  return (
    <section>
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
    </section>
  );
};

export default MonthlyStatsList;
