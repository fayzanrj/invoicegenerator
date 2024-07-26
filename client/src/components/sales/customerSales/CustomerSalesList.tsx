import UrduFont from "@/constants/UrduFont";
import { CustomerSalesProps } from "@/props/SaleProps";
import React from "react";
import CustomerSalesListItem from "./CustomerSalesListItem";
import { CustomerSalesTableHeading } from "@/components/shared/TableHeaders";

// Props
interface CustomerSalesListProps {
  sales: CustomerSalesProps[];
}

const CustomerSalesList: React.FC<CustomerSalesListProps> = ({ sales }) => {
  return (
    <section>
      <table className="w-full min-w-[40rem]">
        <CustomerSalesTableHeading />

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
