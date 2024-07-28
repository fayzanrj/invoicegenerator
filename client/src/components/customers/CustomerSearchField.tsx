import UrduFont from "@/constants/UrduFont";
import useHeaders from "@/hooks/useHeaders";
import useSearchDebounce from "@/hooks/useSearchDebounce";
import CustomerProps from "@/props/CustomerProps";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

// Props
interface CustomerSearchFieldProps {
  setFilteredCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  allCustomers: CustomerProps[];
}

const CustomerSearchField: React.FC<CustomerSearchFieldProps> = ({
  setFilteredCustomers,
  setIsLoading,
  setIsSearching,
  allCustomers,
}) => {
  // State
  const [searchQuery, setSearchQuery] = useState("");

  // Hook
  const headers = useHeaders();

  // Debounce hook to delay search
  const debouncedSearchQuery = useSearchDebounce(searchQuery, 500);

  useEffect(() => {
    // Function to search for query
    const fetchSearchResults = async () => {
      if (debouncedSearchQuery) {
        // Setting loading true
        setIsLoading(true);
        setIsSearching(true);

        try {
          // Fetching
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/customers/searchCustomers?q=${debouncedSearchQuery}`,
            { headers }
          );
          // Setting
          setFilteredCustomers(response.data.customers);
        } catch (error) {
          console.error("Error fetching search results", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setFilteredCustomers(allCustomers); // Resetting to original invoices if no query
        setIsSearching(false);
      }
    };

    // Calling function
    fetchSearchResults();
  }, [debouncedSearchQuery]);

  return (
    <section className="w-3/4 max-w-96 mx-auto my-4 relative">
      <label className="sr-only" htmlFor="customerSearch">
        Customer Search
      </label>
      <input
        id="customerSearch"
        className={`${UrduFont} w-full h-10 px-2 pr-9 border-2 border-gray-200 rounded-md text-right`}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="گاہک کا نام تلاش کریں"
      />
      {/* SEARCH ICON */}
      <IoIosSearch className="absolute right-1.5 top-2" size={"1.5rem"} />
    </section>
  );
};

export default CustomerSearchField;
