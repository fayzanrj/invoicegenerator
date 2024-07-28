"use client";
import FetchMoreButton from "@/components/shared/FetchMoreButton";
import UrduFont from "@/constants/UrduFont";
import useHeaders from "@/hooks/useHeaders";
import fetchSales from "@/libs/fetch/FetchSales";
import { SaleItemProps } from "@/props/SaleProps";
import React, { useEffect, useState } from "react";
import NoSalesFound from "../NoSalesFound";
import { SalesListTableHeading } from "@/components/shared/TableHeaders";
import SalesListItem from "./SalesListItem";
import ScreenLoader from "@/components/shared/ScreenLoader";

// Props
interface SalesListProps {
  sales: SaleItemProps[];
  isLastPage: boolean;
}

const SalesList: React.FC<SalesListProps> = ({ sales, isLastPage }) => {
  // States
  const [allSales, setAllSales] = useState(sales);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetchedAll, setHasFetchedAll] = useState(isLastPage);

  // Hook
  const headers = useHeaders();

  // Function to increase customers current page
  const handleFetchMore = async () => {
    if (!isLoading && !hasFetchedAll) {
      setPageNo((prev) => prev + 1);
    }
  };

  // Function to remove sale from list
  const removeSaleById = async (id: string) => {
    if (allSales.length > 100) {
      const sales = await fetchSales(1, headers.accessToken!);
      if (sales) {
        setAllSales(allSales);
        setPageNo(1);
        setHasFetchedAll(sales.isLastPage);
      }
    } else {
      setAllSales((prevSales) => prevSales.filter((sale) => sale._id !== id));
    }
  };

  useEffect(() => {
    // Fuction to fetch more customers when page number is changed
    const fetchMore = async () => {
      try {
        setIsLoading(true);
        // Fectching
        const data = await fetchSales(pageNo, headers.accessToken!);
        if (data) {
          // Setting
          const newSales = data.sales;
          setAllSales((prev) => [...prev, ...newSales]);
          if (data.isLastPage) {
            setHasFetchedAll(true);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (pageNo > 1 && !hasFetchedAll) fetchMore();
  }, [pageNo, headers.accessToken, hasFetchedAll]);

  return (
    <section className={`${UrduFont}`}>
      {/* CUSTOMER LIST */}
      <table className={`my-4 mt-10 w-full`}>
        <SalesListTableHeading />
        <tbody>
          {allSales.length > 0 ? (
            allSales.map((sale) => (
              <SalesListItem key={sale._id} {...sale} handleRemove={removeSaleById} />
            ))
          ) : (
            <NoSalesFound />
          )}
        </tbody>
      </table>

      {/* BUTTON TO FETCH MORE CUSTOMERS */}
      {!hasFetchedAll && !isLoading && (
        <FetchMoreButton label="فروخت" handleFetchMore={handleFetchMore} />
      )}

      {/* LOADER */}
      {isLoading && <ScreenLoader />}
    </section>
  );
};

export default SalesList;
