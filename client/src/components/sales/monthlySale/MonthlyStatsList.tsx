import UrduFont from "@/constants/UrduFont";
import { MonthlyStatItemProps } from "@/props/SaleProps";
import React from "react";

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
            <tr className="text-center" key={stat.details}>
              <td className="font-sans py-3">{stat.quantity}</td>
              <td>{stat.details}</td>
              <td className="font-sans py-3">{index + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default MonthlyStatsList;
