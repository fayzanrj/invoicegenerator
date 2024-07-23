"use client";
import CustomerProps from "@/props/CustomerProps";
import React, { useState } from "react";
import AddCustomerButton from "./AddCustomerButton";
import CustomerSearchField from "./CustomerSearchField";
import CustomersListItem from "./CustomersListItem";
import NoCustomerFound from "./NoCustomerFound";
import UrduFont from "@/constants/UrduFont";

// Props
interface CustomersListProps {
  customers: CustomerProps[];
}

// Table Headings for Customer List
const CustomerTableHead = () => (
  <thead>
    <tr>
      <th className="py-3 bg-black text-white w-1/4">تاریخ تخلیق</th>
      <th className="bg-black text-white w-1/4">نام</th>
      <th className="bg-black text-white w-1/4">نمبر</th>
    </tr>
  </thead>
);

const CustomersList: React.FC<CustomersListProps> = ({ customers }) => {
  // State
  const [filteredCustomer, setFilteredCustomers] = useState(customers);

  // Handling Search of customer
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    if (query) {
      // Filtering customers based on the query
      const filtered = customers.filter((customer) =>
        customer.name.toLowerCase().includes(query)
      );
      setFilteredCustomers(filtered);
    } else {
      // Reseting to the full customer list when the search query is empty
      setFilteredCustomers(customers);
    }
  };

  // Function to add user to list
  const addCustomerToList = (customer: CustomerProps) => {
    customers.push(customer);
    setFilteredCustomers(customers);
  };

  return (
    <>
      {/* SEARCH CUSTOMER */}
      <CustomerSearchField handleSearch={handleSearch} />

      {/* NEW CUSTOMER */}
      <AddCustomerButton addCustomerToList={addCustomerToList} />

      {/* CUSTOMER LIST */}
      <section className={`${UrduFont}`}>
        <table className={`my-4 mt-10 w-full`}>
          {/* HEADING */}
          <CustomerTableHead />

          {/* BODY */}
          <tbody>
            {filteredCustomer.length > 0 ? (
              filteredCustomer.map((customer, index) => (
                <CustomersListItem key={index} index={index} {...customer} />
              ))
            ) : (
              <NoCustomerFound />
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default CustomersList;
