"use client";
import UrduFont from "@/constants/UrduFont";
import addZero from "@/libs/AddZero";
import InvoiceProps from "@/props/InvoiceProps";
import React, { useCallback, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import useHeaders from "@/hooks/useHeaders";
import useSearchDebounce from "@/hooks/useSearchDebounce";
import ClearButton from "@/components/shared/ClearButton";

// Type for search options
type searchQueryType = "invoiceNumber" | "date" | "buyer" | null;

// Props
interface InvoiceSearchFieldProps {
  setFilteredInvoices: React.Dispatch<React.SetStateAction<InvoiceProps[]>>;
  invoices: InvoiceProps[];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

const InvoiceSearchField: React.FC<InvoiceSearchFieldProps> = ({
  setFilteredInvoices,
  invoices,
  setIsLoading,
  setIsSearching,
}) => {
  // State for search query type and text
  const [searchQueryType, setSearchQueryType] =
    useState<searchQueryType>("invoiceNumber");
  const [searchQueryText, setSearchQueryText] = useState<string>("");

  // Hooks
  const headers = useHeaders();
  const debouncedSearchQuery = useSearchDebounce(searchQueryText, 500); // Debouncing the search query

  // Searching for invoices using the API call
  const searchInvoice = async (query: string, type: searchQueryType) => {
    if (query && type) {
      try {
        setIsLoading(true);
        setIsSearching(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/invoices/searchInvoices?q=${query}&type=${type}`,
          { headers }
        );
        return res.data.invoices as InvoiceProps[];
      } catch (error) {
        console.error("Error fetching invoices from API", error);
        return [];
      } finally {
        setIsLoading(false);
      }
    }
    return invoices; // Returning the original invoices if no query
  };

  // Handling changes in search query type
  const handleSearchQueryTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const val = e.target.value as searchQueryType;
    setSearchQueryType(val || "invoiceNumber");
    setSearchQueryText(""); // Resetting search text on type change
  };

  // Fetching filtered invoices when debounced query changes
  useEffect(() => {
    const fetchFilteredInvoices = async () => {
      const query =
        searchQueryType === "date"
          ? formatDateString(debouncedSearchQuery)
          : debouncedSearchQuery;
      const apiInvoices = await searchInvoice(query, searchQueryType);
      setFilteredInvoices(apiInvoices);
    };

    if (debouncedSearchQuery) {
      fetchFilteredInvoices();
    } else {
      setFilteredInvoices(invoices); // Resetting to original invoices if no query
      setIsSearching(false);
    }
  }, [debouncedSearchQuery, searchQueryType]);

  // Formatting the date string for search
  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return `${addZero(date.getDate())}-${addZero(
      date.getMonth() + 1
    )}-${date.getFullYear()}`;
  };

  // Getting input type based on search query type
  const getInputType = useCallback(() => {
    switch (searchQueryType) {
      case "invoiceNumber":
        return "number";
      case "buyer":
        return "text";
      case "date":
        return "date";
      default:
        return "text";
    }
  }, [searchQueryType]);

  // Getting placeholder text based on search query type
  const getPlaceHolder = useCallback(() => {
    switch (searchQueryType) {
      case "invoiceNumber":
        return "بل# سے تلاش کریں";
      case "buyer":
        return "خریدار سے تلاش کریں";
      default:
        return "تاریخ سے تلاش کریں";
    }
  }, [searchQueryType]);

  return (
    <div className="flex justify-center text-center items-center">
      {/* SEARCH TYPE SELECTOR */}
      <div className="h-full w-1/4 max-w-20 bg-transparent mx-1">
        <label className="sr-only" htmlFor="SearchType">
          Search Type
        </label>
        <select
          className={`${UrduFont} outline-none`}
          onChange={handleSearchQueryTypeChange}
        >
          <option value="invoiceNumber">#بل</option>
          <option value="buyer">خریدار</option>
          <option value="date">تاریخ</option>
        </select>
      </div>

      {/* SEARCH INPUT */}
      <div className="w-3/4 max-w-96 my-4 relative">
        <label className="sr-only" htmlFor="search">
          Search
        </label>
        <input
          id="search"
          type={getInputType()}
          className="w-full h-10 px-2 pr-9 border-2 border-gray-200 rounded-md text-right"
          onChange={(e) => setSearchQueryText(e.currentTarget.value)}
          placeholder={getPlaceHolder()}
          value={searchQueryText}
        />
        <IoIosSearch className="absolute right-1.5 top-2" size={"1.5rem"} />
      </div>

      {/* CEAR BUTTON */}
      <ClearButton
        onClick={() => {
          setIsSearching(false);
          setFilteredInvoices(invoices);
          setSearchQueryText("");
        }}
      />
    </div>
  );
};

export default InvoiceSearchField;
