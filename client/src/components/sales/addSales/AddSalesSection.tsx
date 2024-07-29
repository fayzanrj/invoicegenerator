"use client";
import ClearButton from "@/components/shared/ClearButton";
import UrduFont from "@/constants/UrduFont";
import getCurrentDate from "@/libs/GetCurrentDate";
import CustomerProps from "@/props/CustomerProps";
import { AddSalesItemProps, SaleItemProps } from "@/props/SaleProps";
import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SalesFormDetailsList from "./AddSalesDetailsList";
import SaveSaleButton from "./SaveSaleButton";
import SelectCustomerModal from "../SelectCustomerModal";

// Common props interface
interface CommonProps {
  customers: CustomerProps[];
}

// Props for Modal variant
interface ModalProps extends CommonProps {
  variant: "MODAL";
  closeModal: () => void;
  handleAddSales: (items: SaleItemProps[]) => void;
}

// Props for Page variant
interface PageProps extends CommonProps {
  variant: "PAGE";
}

// Union type for props
type AddSalesSectionProps = ModalProps | PageProps;

// Function to initialize an empty item
const getInitialItem = (): AddSalesItemProps => {
  return {
    _id: uuidv4(),
    details: "",
    quantity: 0,
    builtyNo: "",
    date: getCurrentDate(),
  };
};

const AddSalesSection: React.FC<AddSalesSectionProps> = ({
  customers,
  variant,
  ...props // spread to capture additional props
}) => {
  // States
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

  // Function to clear everything
  const handleClear = () => {
    setCustomer({ id: "", name: "" });
    setItems([getInitialItem()]);
  };

  return (
    <section
      className={`${UrduFont} w-[42rem] p-3 rounded-md mx-auto bg-white ${
        variant === "PAGE" ? "mt-16" : ""
      }`}
    >
      {!customer.id && (
        <SelectCustomerModal
          setCustomer={setCustomer}
          initialCustomers={customers}
          addVariant={variant}
          closeModal={(props as ModalProps).closeModal}
        />
      )}

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
        <SaveSaleButton customerId={customer.id!} saleItems={items} handleAddSales={(props as ModalProps).handleAddSales} />
        {/* BUTTON TO CLEAR EVERYTHING */}
        <ClearButton onClick={handleClear} />
      </div>
    </section>
  );
};

export default AddSalesSection;
