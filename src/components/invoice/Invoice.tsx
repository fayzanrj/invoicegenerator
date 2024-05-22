"use client";
import addZero from "@/libs/client/AddZero";
import ItemProps from "@/props/ItemProps";
import { Noto_Nastaliq_Urdu } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { RiWhatsappFill } from "react-icons/ri";
import DateInput from "../shared/DateInput";
import AddItem from "./AddItem";
import AmountInputField from "./AmountInputField";
import DetailsListItem from "./DetailsListItem";
import InvoiceActionButtons from "./InvoiceActionButtons";
import InvoiceNote from "./InvoiceNote";

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
      details: "",
      quantity: 0,
      rate: 0,
      total: 0,
      date: `${addZero(new Date().getDate())}-${addZero(
        new Date().getMonth() + 1
      )}-${new Date().getFullYear()}`,
    },
  ],
  date = `${addZero(new Date().getDate())}-${addZero(
    new Date().getMonth() + 1
  )}-${new Date().getFullYear()}`,
}) => {
  // States
  const [itemsList, setItemsList] = useState<ItemProps[]>(list);
  const [totalAmount, setTotalAmount] = useState<number>(total);
  const [buyer, setBuyer] = useState(buyerName);
  const [invoiceNote, setInvoiceNote] = useState(note);
  const [invoiceDate, setInvoiceDate] = useState(date);
  const [outstandingAmount, setOutStandingAmount] =
    useState<number>(outstanding);
  const router = useRouter();

  useLayoutEffect(() => {
    if (variant === "EDIT_INVOICE" && !isDraft)
      router.push("/dashboard/drafts");
  }, []);

  // Function to add a new item in the list
  const addItem = () => {
    const newItem: ItemProps = {
      details: "",
      quantity: 0,
      rate: 0,
      total: 0,
      date: `${addZero(new Date().getDate())}-${addZero(
        new Date().getMonth() + 1
      )}-${new Date().getFullYear()}`,
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
        isDraft={false}
      />

      {/* Invoice */}
      <div
        className={`${font.className} mt-3 w-[49rem] min-h-[90] rounded-lg border border-gray-300 p-4 `}
        id="print"
      >
        {/* HEADER */}
        <div className="flex justify-between">
          <p>
            <span className="font-semibold font-sans">{invoiceNumber}</span> #بل
            نمبر
          </p>
          <Image src={"/logo.jpg"} alt="logo" width={110} height={100} />
        </div>

        {/* Company info */}
        <div className="text-right my-2">
          {/* Name */}
          <h2 className="text-xl tracking-tighter font-bold">
            گلشن سٹین لیس سٹیل
          </h2>
          {/* Address */}
          <p className="text-xs mt-4 mb-3">
            گلی نمبر4، عثمانِ غنی کالونی، نوشہرہ روڈ گوجرانوالہ
          </p>
          {/* Contact number */}
          <p className="text-xs font-sans font-semibold">
            0300-8112024
            <span className="ml-1.5">
              <RiWhatsappFill
                size={"1.05rem"}
                className="inline-block align-middle"
              />
            </span>
          </p>
        </div>

        {/* Date and buyer */}
        <div className="flex justify-between items-center my-8">
          <DateInput
            variant="INVOICE"
            date={invoiceDate}
            setDate={setInvoiceDate}
            invoiceVariant={variant}
          />

          <div>
            <input
              id="buyerName"
              className={`min-w-80 p-1 text-right h-12 border-gray-200 mr-2 mt-.5 outline-none ${
                variant === "VIEW_INVOICE" || variant === "DRAFT"
                  ? "border-0"
                  : "border"
              }`}
              placeholder="خریدار کا نام"
              value={buyer}
              onChange={(e) => setBuyer(e.currentTarget.value)}
              readOnly={variant === "VIEW_INVOICE" || variant === "DRAFT"}
            />
            <label htmlFor="buyerName">&#58; خریدار</label>
          </div>
        </div>

        {/* ITEMS LIST LIST */}

        {/* HEADERS */}
        <div className="w-full bg-black flex h-10 itemsList-center py-1.5">
          <p className="text-white w-1/6 text-center">روپے</p>
          <p className="text-white w-1/6 text-center">مقدار</p>
          <p className="text-white w-1/6 text-center">نرخ</p>
          <p className="text-white w-3/6 text-center">تفصیل</p>
        </div>

        {/* All details items */}
        {itemsList.length > -1 &&
          itemsList.map((item, index) => (
            <DetailsListItem
              key={item.total}
              index={index}
              item={item}
              variant={variant}
              updateItem={updateItem}
              removeItem={removeItem}
            />
          ))}

        {/* add item button */}
        {(variant === "NEW_INVOICE" || variant === "EDIT_INVOICE") && (
          <AddItem handleClick={addItem} />
        )}

        {/* Display total */}
        <div className="mt-4 flex justify-between">
          <div>
            <AmountInputField
              id="total"
              label="ٹوٹل"
              value={totalAmount}
              readOnly
            />

            <AmountInputField
              id="outstandingAmount"
              label="سابقہ"
              value={outstandingAmount}
              setValue={setOutStandingAmount}
              readOnly={variant === "VIEW_INVOICE" || variant === "DRAFT"}
            />

            <AmountInputField
              id="grandTotal"
              label="گرینڈ ٹوٹل"
              value={totalAmount + outstandingAmount}
              readOnly
            />

            {/* Signature */}
            <p className="mt-16">_____________ دستخط</p>
          </div>

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
