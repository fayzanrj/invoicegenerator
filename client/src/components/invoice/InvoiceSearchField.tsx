"use client";
import addZero from "@/libs/AddZero";
import { Noto_Nastaliq_Urdu } from "next/font/google";
import React, { useCallback, useState } from "react";
import { IoIosSearch } from "react-icons/io";

// Props
interface InvoiceSearchFieldProps {
  searchInvoice: (text: string, type: searchForType | null) => void;
}

// Font
const font = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "600"],
});

// Type for search options
type searchForType = "invoiceNumber" | "date" | "buyer";

const InvoiceSearchField: React.FC<InvoiceSearchFieldProps> = ({
  searchInvoice,
}) => {
  const [searchFor, setSearchFor] = useState<searchForType>("invoiceNumber");

  // Handling text change in the input field
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchFor === "date") {
      let date = new Date(e.currentTarget.value);
      let dateToFind = `${addZero(date.getDate())}-${addZero(
        date.getMonth() + 1
      )}-${date.getFullYear()}`;

      // Calling the searchInvoice function with formatted date
      searchInvoice(dateToFind, "date");
    } else {
      // Calling the searchInvoice function with the input value
      searchInvoice(e.currentTarget.value, searchFor);
    }
  };

  // Handling the change in the search type dropdown
  const handleSearchForChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;

    if (val !== "invoiceNumber" && val !== "date" && val !== "buyer") return;
    // Updating the state with the selected search type
    setSearchFor(val || "invoiceNumber");
    // Resetting list
    searchInvoice("", null);
  };

  // Determining the input type based on the selected search type
  const getInputType = useCallback(() => {
    switch (searchFor) {
      case "invoiceNumber":
        return "number";
      case "buyer":
        return "text";
      case "date":
        return "date";
      default:
        return "text";
    }
  }, [searchFor]);

  // Determining the placeholder text based on the selected search type
  const getPlaceHolder = useCallback(() => {
    switch (searchFor) {
      case "invoiceNumber":
        return "بل# سے تلاش کریں";
      case "buyer":
        return "خریدار سے تلاش کریں";
      default:
        return "text";
    }
  }, [searchFor]);

  return (
    <div className="flex justify-center text-center items-center">
      {/* Dropdown for selecting search type */}
      <div className="h-full w-1/4 max-w-20 bg-transparent  mx-1">
        <label className="sr-only" htmlFor="SearchType">
          SearchType
        </label>
        <select
          className={`${font.className} outline-none`}
          onChange={handleSearchForChange}
        >
          <option value="invoiceNumber">#بل</option>
          <option value="buyer">خریدار</option>
          <option value="date">تاریخ</option>
        </select>
      </div>
      {/* Input field for entering search text */}
      <div className="w-3/4 max-w-96 my-4 relative ">
        <label className="sr-only" htmlFor="search">
          Search
        </label>
        <input
          id="search"
          type={getInputType()}
          className={`w-full h-10 px-2 pr-9 border-2 border-gray-200 rounded-md text-right`}
          onChange={handleTextChange}
          placeholder={getPlaceHolder()}
        />
        {/* Search icon */}
        <IoIosSearch className="absolute right-1.5 top-2" size={"1.5rem"} />
      </div>
    </div>
  );
};

export default InvoiceSearchField;
