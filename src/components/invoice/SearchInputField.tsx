import React from "react";
import { IoIosSearch } from "react-icons/io";

interface SearchInputFieldProps {
  searchInvoice: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInputField: React.FC<SearchInputFieldProps> = ({
  searchInvoice,
}) => {
  return (
    <>
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <div className="max-w-96 w-full my-4 relative mx-auto">
        <input
          id="search"
          type="number"
          className="w-full h-10 px-2 pr-7 border-2 border-gray-200 rounded-md"
          onChange={searchInvoice}
          placeholder="Search invoice number..."
        />
        <IoIosSearch className="absolute right-1.5 top-2" size={"1.5rem"} />
      </div>
    </>
  );
};

export default SearchInputField;
