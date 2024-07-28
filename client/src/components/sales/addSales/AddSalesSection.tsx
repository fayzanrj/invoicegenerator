"use client";
import UrduFont from "@/constants/UrduFont";
import getCurrentDate from "@/libs/GetCurrentDate";
import { AddSalesItemProps } from "@/props/SaleProps";
import CustomerProps from "@/props/CustomerProps";
import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SelectInput from "../../shared/SelectInput";
import SalesFormDetailsList from "./AddSalesDetailsList";
import SaveSaleButton from "./SaveSaleButton";
import ClearButton from "@/components/shared/ClearButton";
import SelectCustomerModal from "./SelectCustomerModal";

// Props
interface AddSalesSectionProps {
  customers: CustomerProps[];
}

// Function to initilise empty item
const getInitialItem = (): AddSalesItemProps => {
  return {
    _id: uuidv4(),
    details: "",
    quantity: 0,
    builtyNo: "",
    date: getCurrentDate(),
  };
};

const AddSalesSection: React.FC<AddSalesSectionProps> = ({ customers }) => {
  // Staes
  const [customer, setCustomer] = useState<{ id: string; name: string }>({
    id: "",
    name: "",
  });
  const [items, setItems] = useState<AddSalesItemProps[]>([getInitialItem()]);

  // Function to add a new item
  const addItem = useCallback(() => {
    setItems((prev) => [...prev, getInitialItem()]);
  }, []);

  // Function to remove an item by index
  const removeItem = useCallback((index: number) => {
    setItems((prevItemsList) => {
      const newItemsList = [...prevItemsList];
      newItemsList.splice(index, 1);
      return newItemsList;
    });
  }, []);

  // Function to update an item
  const updateItem = useCallback(
    (index: number, updatedItem: AddSalesItemProps) => {
      setItems((prevItemsList) => {
        const updatedItemsList = [...prevItemsList];
        updatedItemsList[index] = updatedItem;
        return updatedItemsList;
      });
    },
    []
  );

  // Functio to clear everyting
  const handleClear = () => {
    setCustomer({
      id: "",
      name: "",
    });
    setItems([getInitialItem()]);
  };

  return (
    <section className={`${UrduFont} w-[40rem] mx-auto mt-16`}>
      {!customer.id && <SelectCustomerModal setCustomer={setCustomer} initialCustomers={customers} />}

      <div className="my-6 flex justify-between items-center">
        <button
          onClick={() =>
            setCustomer({
              id: "",
              name: "",
            })
          }
        >
          خریدار بدلیں
        </button>

        <p className={`${UrduFont} text-right text-lg`}>
          خریدار : {customer.name}
        </p>
      </div>

      {/* SALES ITEMS */}
      <SalesFormDetailsList
        addItem={addItem}
        removeItem={removeItem}
        items={items}
        updateItem={updateItem}
      />

      <div>
        {/* SAVE BUTTON */}
        <SaveSaleButton customerId={customer.id!} saleItems={items} />
        {/* BUTTON TO CLEAR EVERTHING */}
        <ClearButton onClick={handleClear} />
      </div>
    </section>
  );
};

export default AddSalesSection;
