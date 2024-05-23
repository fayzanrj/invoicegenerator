"use client";
import addZero from "@/libs/client/AddZero";
import ItemProps from "@/props/ItemProps";
import { Noto_Nastaliq_Urdu } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import DateInput from "../shared/DateInput";
import BuyerInputField from "./BuyerInputField";
import CompanyInfoInvoiceNumber from "./CompanyInfoInvoiceNumber";
import InvoiceActionButtons from "./InvoiceActionButtons";
import InvoiceDetailsList from "./InvoiceDetailsList";
import InvoiceNote from "./InvoiceNote";
import TotalAndSignature from "./TotalAndSignature";
import { v4 as uuidv4 } from "uuid";

// Function to get latest date
const getDate = () =>
  `${addZero(new Date().getDate())}-${addZero(
    new Date().getMonth() + 1
  )}-${new Date().getFullYear()}`;

// Font
const font = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "600"],
});

// Props
interface InvoiceProps {
  invoiceNumber: number;
  variant: "NEW_INVOICE" | "VIEW_INVOICE" | "EDIT_INVOICE" | "DRAFT";
  total?: number;
  buyerName?: string;
  date?: string;
  list?: ItemProps[];
  outstanding?: number;
  note?: string;
  isDraft?: boolean;
}

// Giving default values to each props and then passing it to states to give an initial value, in order to reuse same component for creating and displaying saved invoice

const Invoice: React.FC<InvoiceProps> = ({
  invoiceNumber,
  variant,
  buyerName = "",
  note = "",
  outstanding = 0,
  total = 0,
  isDraft = false,
  list = [
    {
      id: uuidv4(),
      details: "",
      quantity: 0,
      rate: 0,
      total: 0,
      date: getDate(),
    },
  ],
  date = getDate(),
}) => {
  // States
  const [itemsList, setItemsList] = useState<ItemProps[]>(list);
  const [totalAmount, setTotalAmount] = useState<number>(total);
  const [buyer, setBuyer] = useState(buyerName);
  const [invoiceNote, setInvoiceNote] = useState(note);
  const [invoiceDate, setInvoiceDate] = useState(date);
  const [outstandingAmount, setOutStandingAmount] =
    useState<number>(outstanding);

  // Function to add a new item in the list
  const addItem = () => {
    const newItem: ItemProps = {
      id: uuidv4(),
      details: "",
      quantity: 0,
      rate: 0,
      total: 0,
      date: getDate(),
    };
    setItemsList((prevItemsList) => [...prevItemsList, newItem]);
  };

  // Function to update a list item
  const updateItem = useCallback((index: number, updatedItem: ItemProps) => {
    setItemsList((prevItemsList) => {
      const updatedItemsList = [...prevItemsList];
      updatedItemsList[index] = updatedItem;
      return updatedItemsList;
    });
  }, []);

  // Function to remove list item from list array
  const removeItem = useCallback((index: number) => {
    setItemsList((prevItemsList) => {
      const newItemsList = [...prevItemsList];
      newItemsList.splice(index, 1);
      return newItemsList;
    });
  }, []);

  // Calculating total every time outstanding payment or itemsList changes
  useEffect(() => {
    let totalAmount = 0;
    itemsList.forEach((item) => {
      totalAmount += item.total;
    });
    setTotalAmount(totalAmount);
  }, [itemsList, outstandingAmount]);

  return (
    <>
      {/* Button to save invoice in database */}
      <InvoiceActionButtons
        variant={variant}
        buyerName={buyer}
        date={invoiceDate}
        invoiceNumber={invoiceNumber}
        list={itemsList}
        total={totalAmount}
        outstanding={outstandingAmount}
        note={invoiceNote}
        isDraft={isDraft}
      />

      {/* Invoice */}
      <div
        className={`${font.className} mt-3 w-[49rem] min-h-[90] rounded-lg border border-gray-300 p-4 `}
        id="print"
      >
        <CompanyInfoInvoiceNumber invoiceNumber={invoiceNumber} />

        {/* Date and buyer */}
        <div className="flex justify-between items-center my-8">
          <DateInput
            variant="INVOICE"
            date={invoiceDate}
            setDate={setInvoiceDate}
            invoiceVariant={variant}
          />

          <BuyerInputField
            buyer={buyer}
            setBuyer={setBuyer}
            variant={variant}
          />
        </div>

        {/* ITEMS LIST */}
        <InvoiceDetailsList
          variant={variant}
          items={itemsList}
          addItem={addItem}
          removeItem={removeItem}
          updateItem={updateItem}
        />

        {/* Display total */}
        <div className="mt-4 flex justify-between">
          <TotalAndSignature
            variant={variant}
            totalAmount={totalAmount}
            outstandingAmount={outstandingAmount}
            setOutStandingAmount={setOutStandingAmount}
          />

          {/* Note */}
          <InvoiceNote
            variant={variant}
            note={invoiceNote}
            setNote={setInvoiceNote}
          />
        </div>
      </div>
    </>
  );
};

export default Invoice;
