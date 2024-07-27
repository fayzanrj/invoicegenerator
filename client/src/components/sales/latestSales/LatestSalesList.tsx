"use client";
import FetchMoreButton from "@/components/shared/FetchMoreButton";
import UrduFont from "@/constants/UrduFont";
import useHeaders from "@/hooks/useHeaders";
import fetchSales from "@/libs/fetch/FetchSales";
import { SaleItemProps } from "@/props/SaleProps";
import React, { useEffect, useState } from "react";
import NoSalesFound from "../NoSalesFound";
import { LatestSalesTableHeading } from "@/components/shared/TableHeaders";
import LatestSalesListItem from "./LatestSalesListItem";
import ScreenLoader from "@/components/shared/ScreenLoader";

// Props
interface LatestSalesListProps {
  sales: SaleItemProps[];
  isLastPage: boolean;
}

const LatestSalesList: React.FC<LatestSalesListProps> = ({
  sales,
  isLastPage,
}) => {
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
        <LatestSalesTableHeading />
        <tbody>
          {allSales.length > 0 ? (
            allSales.map((sale) => (
              <LatestSalesListItem key={sale._id} {...sale} />
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

export default LatestSalesList;
