"use client";
import ScreenLoader from "@/components/shared/ScreenLoader";
import UrduFont from "@/constants/UrduFont";
import useHeaders from "@/hooks/useHeaders";
import handleApiError from "@/libs/HandleApiError";
import CustomerProps from "@/props/CustomerProps";
import { CustomerSalesProps, SaleMonthProps } from "@/props/SaleProps";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MonthSelectionInput from "../MonthSelectionInput";
import CustomerSalesList from "./CustomerSalesList";
import Link from "next/link";
import ButtonLayout from "@/components/shared/ButtonLayout";
import RefreshButton from "@/components/shared/RefreshButton";
import NoSalesFound from "../NoSalesFound";

// Props
interface CustomerSaleStatsProps {
  months: SaleMonthProps[];
  customerId: string;
}

const CustomerSaleStats: React.FC<CustomerSaleStatsProps> = ({
  months,
  customerId,
}) => {
  // States
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [sales, setSales] = useState<CustomerSalesProps[] | null>([]);
  const [customer, setCustomer] = useState<CustomerProps | null>();

  // Hook
  const headers = useHeaders();

  // Function to handle month change
  const handleMonthChange = (monthId: string) => {
    const index = months.findIndex((month) => month._id === monthId);
    if (index > -1) setSelectedMonth(months[index]);
  };

  // Function to fetch sales of a particular customer
  const fetchSales = async () => {
    try {
      setIsLoading(true);

      // Early exit
      if (!selectedMonth || !headers.accessToken) return;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/sales/getSalesByCustomerId/${customerId}?monthId=${selectedMonth._id}`,
        {
          headers,
        }
      );

      setSales(res.data.sales);
      setCustomer(res.data.customer);
    } catch (error) {
      handleApiError(error);
      setSales(null);
      setCustomer(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Use effect to run on compnent mount
  useEffect(() => {
    fetchSales();
  }, [selectedMonth, headers.accessToken, customerId]);

  return (
    <>
      {isLoading && <ScreenLoader />}

      {/* MONTH INPUT */}
      <section className="flex justify-center items-end">
        <RefreshButton handleClick={fetchSales} />

        <MonthSelectionInput
          months={months}
          handleSelection={handleMonthChange}
          selectedMonthId={selectedMonth._id}
        />
      </section>

      {/* ACTION BUTTON AND HEADING */}
      <section className="my-8 text-right flex justify-between items-center">
        <Link
          href={`/dashboard/invoices/invoiceBySales?customerId=${customer?._id}&monthId=${selectedMonth._id}`}
        >
          <ButtonLayout isNav className={UrduFont}>
            بل بنائیں
          </ButtonLayout>
        </Link>

        <h2 className="text-3xl">
          <span className={UrduFont}>{customer?.name} </span>-{" "}
          {selectedMonth.monthName}
        </h2>
      </section>

      {/* SALES LIST */}
      {(!sales || sales.length <= 0) && !isLoading ? (
        <NoSalesFound />
      ) : (
        <CustomerSalesList sales={sales || []} />
      )}
    </>
  );
};

export default CustomerSaleStats;
