"use client";
import FetchMoreButton from "@/components/shared/FetchMoreButton";
import Loader from "@/components/shared/Loader";
import UrduFont from "@/constants/UrduFont";
import useHeaders from "@/hooks/useHeaders";
import fetchCustomers from "@/libs/fetch/FetchCustomers";
import CustomerProps from "@/props/CustomerProps";
import React, { useEffect, useState } from "react";
import { CustomerListTableHeading } from "../shared/TableHeaders";
import AddCustomerButton from "./AddCustomerButton";
import CustomerSearchField from "./CustomerSearchField";
import CustomersListItem from "./CustomersListItem";
import NoCustomerFound from "./NoCustomerFound";
import ScreenLoader from "../shared/ScreenLoader";

// Props
interface CustomersListProps {
  customers: CustomerProps[];
  isLastPage: boolean;
}

const CustomersList: React.FC<CustomersListProps> = ({
  customers,
  isLastPage,
}) => {
  // States
  const [allCustomers, setAllCustomers] = useState(customers);
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetchedAll, setHasFetchedAll] = useState(isLastPage);
  const [isSearching, setIsSearching] = useState(false);

  // Hook
  const headers = useHeaders();

  // Function to increase customers current page
  const handleFetchMore = async () => {
    if (!isLoading && !hasFetchedAll && !isSearching) {
      setPageNo((prev) => prev + 1);
    }
  };

  useEffect(() => {
    // Fuction to fetch more customers when page number is changed
    const fetchMore = async () => {
      try {
        setIsLoading(true);
        // Fectching
        const data = await fetchCustomers(pageNo, headers.accessToken!);
        if (data) {
          // Setting
          const newCustomers = data.customers;
          setFilteredCustomers((prev) => [...prev, ...newCustomers]);
          setAllCustomers((prev) => [...prev, ...newCustomers]);
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
      {/* FIELD TO SEARCH CUSTOMER  */}
      <CustomerSearchField
        allCustomers={allCustomers}
        setFilteredCustomers={setFilteredCustomers}
        setIsSearching={setIsSearching}
        setIsLoading={setIsLoading}
      />

      {/* BUTTON TO ADD A NEW CUSTOMER */}
      <AddCustomerButton
        addCustomerToList={(newCustomer) => {
            const newCustromerList = [...customers, newCustomer]
            setAllCustomers(newCustromerList)
            if(filteredCustomers.length === newCustromerList.length -1 ){
              setFilteredCustomers(newCustromerList)
            }
          }
        }
      />

      <section className={`${UrduFont}`}>
        {/* CUSTOMER LIST */}
        <table className={`my-4 mt-10 w-full`}>
          <CustomerListTableHeading />
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer, index) => (
                <CustomersListItem key={customer.customerNo} {...customer} />
              ))
            ) : (
              <NoCustomerFound />
            )}
          </tbody>
        </table>

        {/* BUTTON TO FETCH MORE CUSTOMERS */}
        {!hasFetchedAll && !isLoading && !isSearching && (
          <FetchMoreButton label="کسٹمر" handleFetchMore={handleFetchMore} />
        )}

        {/* LOADER */}
        {isLoading && (
          <ScreenLoader />
        )}
      </section>
    </>
  );
};

export default CustomersList;
