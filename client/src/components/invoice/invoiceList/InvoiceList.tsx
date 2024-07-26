"use client";
import FetchMoreButton from "@/components/shared/FetchMoreButton";
import ScreenLoader from "@/components/shared/ScreenLoader";
import { InvoiceListTableHeading } from "@/components/shared/TableHeaders";
import UrduFont from "@/constants/UrduFont";
import useHeaders from "@/hooks/useHeaders";
import fetchInvoices from "@/libs/fetch/FetchInvoices";
import InvoiceProps from "@/props/InvoiceProps";
import React, { useEffect, useState } from "react";
import InvoiceListItem from "./InvoiceListItem";
import InvoiceSearchField from "./InvoiceSearchField";
import NoInvoicesFound from "./NoInvoicesFound";

// Props
interface InvoiceListProps {
  invoices: InvoiceProps[];
  variant: "invoices" | "drafts";
  isLastPage: boolean;
}

const InvoiceList: React.FC<InvoiceListProps> = ({
  invoices,
  variant,
  isLastPage,
}) => {
  // States
  const [allInvoices, setAllInvoices] = useState(invoices);
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetchedAll, setHasFetchedAll] = useState(isLastPage);
  const [isSearching, setIsSearching] = useState(false);

  // Hook
  const headers = useHeaders();

  // Function to increase page number of invoices to fetch more invoices
  const handleFetchMore = async () => {
    if (!isLoading && !hasFetchedAll && !isSearching) {
      setPageNo((prev) => prev + 1);
    }
  };

  useEffect(() => {
    // Function to fetch more invoices when page number is changed
    const fetchMore = async () => {
      try {
        setIsLoading(true);

        // Fetching
        const data = await fetchInvoices(variant, pageNo, headers.accessToken!);

        // Setting
        if (data) {
          const newInvoices = data.invoices;
          setFilteredInvoices((prev) => [...prev, ...newInvoices]);
          setAllInvoices((prev) => [...prev, ...newInvoices]);
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
    <>
      {/* INPUT FIEL TO SEARCH INVOICES */}
      <InvoiceSearchField
        setFilteredInvoices={setFilteredInvoices}
        invoices={allInvoices}
        setIsLoading={setIsLoading}
        setIsSearching={setIsSearching}
      />

      <section className={`${UrduFont} my-4 mt-10 w-full`}>
        <table className="w-full">
          <InvoiceListTableHeading />
          <tbody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <InvoiceListItem
                  key={invoice.invoiceNumber}
                  variant={variant}
                  {...invoice}
                />
              ))
            ) : (
              <NoInvoicesFound />
            )}
          </tbody>
        </table>

        {/* BUTTON TO FETCH MORE INVOICES */}
        {!hasFetchedAll && !isLoading && !isSearching && (
          <FetchMoreButton label="بل" handleFetchMore={handleFetchMore} />
        )}

        {/* LOADER */}
        {isLoading && <ScreenLoader />}
      </section>
    </>
  );
};

export default InvoiceList;
