"use client";
import DateInput from "@/components/shared/DateInput";
import ScreenLoader from "@/components/shared/ScreenLoader";
import useHeaders from "@/hooks/useHeaders";
import getCurrentDate from "@/libs/GetCurrentDate";
import handleApiError from "@/libs/HandleApiError";
import { SaleItemProps } from "@/props/SaleProps";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import NoSalesFound from "../NoSalesFound";
import SalesByDateList from "./SalesByDateList";
import RefreshButton from "@/components/shared/RefreshButton";

const SalesByDate = () => {
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [sales, setSales] = useState<SaleItemProps[] | null>(null);

  const headers = useHeaders();

  // Handler for date change
  const handleDateChange = useCallback((newDate: string) => {
    setSelectedDate(newDate);
  }, []);

  const fetchSales = async () => {
    try {
      setIsLoading(true);

      if (!selectedDate || !headers.accessToken) return;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/sales/getSalesByDate?date=${selectedDate}`,
        {
          headers,
        }
      );

      console.log(res.data);
      setSales(res.data.sales);
    } catch (error) {
      handleApiError(error);
      setSales(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Use effect to run on component mount
  useEffect(() => {
    fetchSales();
  }, [selectedDate, headers.accessToken]);

  return (
    <>
      {isLoading && <ScreenLoader />}

      <section>
        <section className="flex justify-center items-end my-8">
          <RefreshButton handleClick={fetchSales} />

          <DateInput
            variant="SALE"
            subVariant="SALES"
            date={selectedDate}
            setDate={handleDateChange}
          />
        </section>

        {sales && sales.length > 0 ? (
          <SalesByDateList sales={sales} />
        ) : (
          <NoSalesFound />
        )}
      </section>
    </>
  );
};

export default SalesByDate;
