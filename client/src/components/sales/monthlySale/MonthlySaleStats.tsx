"use client";
import useHeaders from "@/hooks/useHeaders";
import handleApiError from "@/libs/HandleApiError";
import { MonthlyStatItemProps, SaleMonthProps } from "@/props/SaleProps";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MonthSelectionInput from "../MonthSelectionInput";
import ScreenLoader from "@/components/shared/ScreenLoader";
import MonthlyStatsList from "./MonthlyStatsList";
import RefreshButton from "@/components/shared/RefreshButton";
import NoSalesFound from "../NoSalesFound";

// Props
interface MonthlySaleStatsProps {
  months: SaleMonthProps[];
}

const MonthlySaleStats: React.FC<MonthlySaleStatsProps> = ({ months }) => {
  // States
  const [selectedMonth, setSelectedMonth] = useState(months[months.length - 1]);
  const [isLoading, setIsLoading] = useState(false);
  const [saleStats, setSaleStats] = useState<MonthlyStatItemProps[] | null>([]);

  // Hook
  const headers = useHeaders();

  // Function to handle selected month change
  const handleMonthChange = (monthId: string) => {
    const index = months.findIndex((month) => month._id === monthId);
    if (index > -1) setSelectedMonth(months[index]);
  };

  // Function to fetch latest stats
  const fetchStats = async () => {
    try {
      setIsLoading(true);

      if (!selectedMonth || !headers.accessToken) return;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/sales/getMonthlySalesStats/${selectedMonth._id}`,
        {
          headers,
        }
      );

      setSaleStats(res.data.sales);
    } catch (error) {
      handleApiError(error);
      setSaleStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Use effect to run on component mount
  useEffect(() => {
    fetchStats();
  }, [selectedMonth, headers.accessToken]);

  return (
    <>
      {isLoading && <ScreenLoader />}

      {/* MONTH SELECTION */}
      <section className="flex justify-center items-end">
        <RefreshButton handleClick={fetchStats} />

        <MonthSelectionInput
          months={months}
          handleSelection={handleMonthChange}
          selectedMonthId={selectedMonth._id}
        />
      </section>

      {/* STATS LIST */}
      {(!saleStats || saleStats.length <= 0) && !isLoading ? (
        <NoSalesFound />
      ) : (
        <MonthlyStatsList stats={saleStats || []} />
      )}
    </>
  );
};

export default MonthlySaleStats;
