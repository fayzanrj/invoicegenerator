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
import AddSalesButton from "./AddSalesButton";

const SalesByDate = () => {
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [sales, setSales] = useState<SaleItemProps[] | null>(null);

  // Hook
  const headers = useHeaders();

  // Handler for date change
  const handleDateChange = useCallback((newDate: string) => {
    setSelectedDate(newDate);
  }, []);

  // Function to remove sale from list
  const handleRemove = async (id: string) => {
    setSales(
      (prevSales) => prevSales && prevSales.filter((sale) => sale._id !== id)
    );
  };

  // Function to add new sales
  const handleAddSales = (newSales: SaleItemProps[]) => {
    setSales((prev) => {
      const updatedSales = [...(prev || [])];

      // Adding the new sales that match the selected date
      newSales.forEach((sale) => {
        if (sale.date === selectedDate) {
          updatedSales.push(sale);
        }
      });

      // Return the new array
      return updatedSales;
    });
  };

  // Function to fetch sales
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
      {/* DATE SELECTION */}
      <section className="flex justify-center items-end my-8">
        <RefreshButton handleClick={fetchSales} />

        <DateInput
          variant="SALE"
          subVariant="SALES"
          date={selectedDate}
          setDate={handleDateChange}
        />
      </section>

      {isLoading ? (
        <ScreenLoader />
      ) : (
        <>
          {/* SALES LIST */}
          {sales && sales.length > 0 && !isLoading ? (
            <SalesByDateList sales={sales} handleRemove={handleRemove} />
          ) : (
            <NoSalesFound />
          )}

          <AddSalesButton handleAddSales={handleAddSales} />
        </>
      )}
    </>
  );
};

export default SalesByDate;
