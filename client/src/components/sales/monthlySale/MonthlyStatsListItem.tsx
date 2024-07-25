import { MonthlyStatItemProps } from "@/props/SaleProps";
import React from "react";

// Props
interface MonthlyStatsListItemProps extends MonthlyStatItemProps {
  index: number;
}

const MonthlyStatsListItem: React.FC<MonthlyStatsListItemProps> = ({
  index,
  quantity,
  details
}) => {
  return (
    <tr className="text-center">
      <td className="font-sans py-3">{quantity}</td>
      <td>{details}</td>
      <td className="font-sans py-3">{index + 1}</td>
    </tr>
  );
};

export default MonthlyStatsListItem;
