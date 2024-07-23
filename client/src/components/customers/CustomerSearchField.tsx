import UrduFont from "@/constants/UrduFont";
import React from "react";
import { IoIosSearch } from "react-icons/io";

// Props
interface CustomerSearchFieldProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomerSearchField: React.FC<CustomerSearchFieldProps> = ({
  handleSearch,
}) => {
  return (
    <section className="w-3/4 max-w-96 mx-auto my-4 relative">
      <label className="sr-only" htmlFor="customerSearch">
        Customer Search
      </label>
      <input
        id="customerSearch"
        className={`${UrduFont} w-full h-10 px-2 pr-9 border-2 border-gray-200 rounded-md text-right`}
        onChange={handleSearch}
        placeholder="کسٹمر کا نام تلاش کریں"
      />
      {/* Search icon */}
      <IoIosSearch className="absolute right-1.5 top-2" size={"1.5rem"} />
    </section>
  );
};

export default CustomerSearchField;
