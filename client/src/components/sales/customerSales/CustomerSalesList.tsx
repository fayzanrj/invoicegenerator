import UrduFont from "@/constants/UrduFont";
import { CustomerSalesProps } from "@/props/SaleProps";
import React from "react";
import CustomerSalesListItem from "./CustomerSalesListItem";

// Props
interface CustomerSalesListProps {
  sales: CustomerSalesProps[];
}

// Table Headings
const TableHead = () => (
  <thead>
    <tr className={UrduFont}>
      <th className="py-3 bg-black text-white w-1/4">بلٹی نمبر</th>
      <th className="bg-black text-white w-1/4">مقدار</th>
      <th className="bg-black text-white w-1/4">تفصیل</th>
      <th className="bg-black text-white w-1/4">تاریخ</th>
    </tr>
  </thead>
);

const CustomerSalesList: React.FC<CustomerSalesListProps> = ({ sales }) => {
  return (
    <section>
      <table className="w-full min-w-[40rem]">
        <TableHead />

        {/* TABLE BODY */}
        <tbody>
          {sales.map((stat) => (
            <CustomerSalesListItem
              key={stat.date}
              date={stat.date}
              items={stat.items}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CustomerSalesList;
