"use client";
import UrduFont from "@/constants/UrduFont";
import getCurrentDate from "@/libs/GetCurrentDate";
import {AddSalesItemProps} from "@/props/SaleProps";
import CustomerProps from "@/props/CustomerProps";
import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SelectInput from "../../shared/SelectInput";
import SalesFormDetailsList from "./AddSalesDetailsList";
import SaveSaleButton from "./SaveSaleButton";
import ClearButton from "@/components/shared/ClearButton";

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
  const [customerId, setCustomerId] = useState<string>("");
  const [items, setItems] = useState<AddSalesItemProps[]>([getInitialItem()]);

  // Function to handle customer selection change
  const handleCustomerChange = (val: string) => setCustomerId(val);

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
    setCustomerId("");
    setItems([getInitialItem()]);
  };

  return (
    <section className={`${UrduFont} w-[40rem] mx-auto`}>
      {/* CUSTOMER SELECTION INPUT */}
      <SelectInput
        variant="CUSTOMERS"
        id="customerSelectInput"
        label="کسٹمر"
        onChange={handleCustomerChange}
        options={customers}
        placeholder="کسٹمر کا انتخاب کریں"
        value={customerId}
      />

      {/* SALES ITEMS */}
      <SalesFormDetailsList
        addItem={addItem}
        removeItem={removeItem}
        items={items}
        updateItem={updateItem}
      />

      <div>
        {/* SAVE BUTTON */}
        <SaveSaleButton customerId={customerId} saleItems={items} />
        {/* BUTTON TO CLEAR EVERTHING */}
        <ClearButton onClick={handleClear} />
      </div>
    </section>
  );
};

export default AddSalesSection;
