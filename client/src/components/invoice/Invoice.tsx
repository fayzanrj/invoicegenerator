"use client";
import getCurrentDate from "@/libs/GetCurrentDate";
import { InvoiceItemProps } from "@/props/InvoiceProps";
import { Noto_Nastaliq_Urdu } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DateInput from "../shared/DateInput";
import BuyerInputField from "./BuyerInputField";
import CompanyInfoInvoiceNumber from "./CompanyInfoInvoiceNumber";
import InvoiceActionButtons from "./InvoiceActionButtons";
import InvoiceDetailsList from "./InvoiceDetailsList";
import InvoiceNote from "./InvoiceNote";
import TotalAndSignature from "./TotalAndSignature";

// Font
const font = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "600"],
});

// Props
interface InvoiceFormProps {
  invoiceNumber: number;
  variant: "NEW_INVOICE" | "VIEW_INVOICE" | "EDIT_INVOICE" | "DRAFT";
  total?: number;
  buyerName?: string;
  date?: string;
  list?: InvoiceItemProps[];
  outstanding?: number;
  note?: string;
  isDraft?: boolean;
  builtyNo?: string;
}

let EmptyListItem: InvoiceItemProps = {
  _id: uuidv4(),
  details: "",
  quantity: 0,
  rate: 0,
  total: 0,
  date: getCurrentDate(),
  builtyNo: "",
};

// Giving default values to each props and then passing it to states to give an initial value, in order to reuse same component for creating and displaying saved invoice

const Invoice: React.FC<InvoiceFormProps> = ({
  invoiceNumber,
  variant,
  buyerName = "",
  note = "",
  outstanding = 0,
  total = 0,
  isDraft = false,
  list = [EmptyListItem],
  date = getCurrentDate(),
}) => {
  // States
  const [itemsList, setItemsList] = useState<InvoiceItemProps[]>(list);
  const [totalAmount, setTotalAmount] = useState<number>(total);
  const [buyer, setBuyer] = useState(buyerName);
  const [invoiceNote, setInvoiceNote] = useState(note);
  const [invoiceDate, setInvoiceDate] = useState(date);
  const [outstandingAmount, setOutStandingAmount] =
    useState<number>(outstanding);

  // Function to add a new item in the list
  const addItem = () => {
    const newId = uuidv4();
    EmptyListItem = { ...EmptyListItem, _id: newId };
    setItemsList((prevItemsList) => [...prevItemsList, EmptyListItem]);
  };

  // Function to update a list item
  const updateItem = useCallback(
    (index: number, updatedItem: InvoiceItemProps) => {
      setItemsList((prevItemsList) => {
        const updatedItemsList = [...prevItemsList];
        updatedItemsList[index] = updatedItem;
        return updatedItemsList;
      });
    },
    []
  );

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
      {/* All Invoice buttons */}
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
            subVariant={variant}
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
