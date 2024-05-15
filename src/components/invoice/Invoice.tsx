"use client";
import ItemProps from "@/props/ItemProps";
import { Noto_Nastaliq_Urdu } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddItem from "./AddItem";
import DetailsListItem from "./DetailsListItem";
import PrintAndDownloadButton from "./PrintAndDownloadButton";
import SaveButton from "./SaveButton";
import { FaPhone } from "react-icons/fa";
import AmountInputField from "./AmountInputField";

// Font
const font = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "600"],
});

// Props
interface InvoiceProps {
  invoiceNumber: number;
  variant: "NEW_INVOICE" | "VIEW_INVOICE";
  total?: number;
  buyerName?: string;
  date?: string;
  list?: ItemProps[];
  outstanding?: number;
  note?: string;
}

// Giving default values to each props and then passing it to states to give an initial value, in order to reuse same component for creating and displaying saved invoice

const Invoice: React.FC<InvoiceProps> = ({
  invoiceNumber,
  variant,
  buyerName = "",
  note = "",
  outstanding = 0,
  total = 0,
  list = [
    {
      details: "",
      quantity: 0,
      rate: 0,
      total: 0,
    },
  ],
  date = `${new Date().getDate()}-${
    new Date().getMonth() + 1
  }-${new Date().getFullYear()}`,
}) => {
  // States
  const [itemsList, setItemsList] = useState<ItemProps[]>(list);
  const [totalAmount, setTotalAmount] = useState<number>(total);
  const [buyer, setBuyer] = useState(buyerName);
  const [invoiceNote, setInvoiceNote] = useState(note);
  const [outstandingAmount, setOutStandingAmount] =
    useState<number>(outstanding);

  // Fucntion to add a new item in the list
  const addItem = () => {
    const newItem: ItemProps = {
      details: "",
      quantity: 0,
      rate: 0,
      total: 0,
    };
    setItemsList([...itemsList, newItem]);
  };

  // Function to updating a list item
  const updateItem = (index: number, updatedItem: ItemProps) => {
    const updatedItemsList = [...itemsList];
    updatedItemsList[index] = updatedItem;
    setItemsList(updatedItemsList);
  };

  // Function to remove list item from list array
  const removeItem = (index: number) => {
    setItemsList((prevItemsList) => {
      const newItemsList = [...prevItemsList];
      newItemsList.splice(index, 1);
      return newItemsList;
    });
  };

  // Calculating total every time outstanding payment ot itemslist changes
  useEffect(() => {
    let totalAmount = 0;
    itemsList.forEach((item) => {
      totalAmount += item.total;
    });
    setTotalAmount(totalAmount);
  }, [itemsList, outstandingAmount]);

  return (
    <>
      <div>
        {/* Button to save invoice in database */}
        {variant === "NEW_INVOICE" && (
          <SaveButton
            buyerName={buyer}
            date={date}
            invoiceNumber={invoiceNumber}
            list={itemsList}
            total={totalAmount}
            outstanding={outstandingAmount}
            note={invoiceNote}
          />
        )}
        <PrintAndDownloadButton />
      </div>

      {/* Invoice */}
      <div
        className={`${font.className} mt-3 w-[40rem] min-h-[90] rounded-lg border border-gray-300 p-4`}
        id="print"
      >
        {/* HEADER */}
        <div className="flex justify-between">
          <p>
            <span className="font-semibold font-sans">{invoiceNumber}</span>{" "}
            #رسید نمبر
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
            گلی نمبر4، عثمان کالونی، نوشہرہ روڈ گوجرانوالہ
          </p>
          {/* Contact number */}
          <p className="text-xs font-sans font-semibold">
            0300-8112024
            <span className="ml-1.5">
              <FaPhone className="inline-block align-middle" />
            </span>
          </p>
        </div>

        {/* Date and buyer */}
        <div className="flex justify-between itemsList-center my-8">
          {/* Date */}
          <p>
            <span className="font-sans font-semibold">{date}</span>
            {"  "}
            &#58; تاریخ
          </p>

          <div>
            <input
              id="buyerName"
              className={`min-w-80 p-1 text-right h-12 border-gray-200 mr-2 mt-.5 outline-none ${
                variant === "NEW_INVOICE" ? "border" : "border-0"
              }`}
              placeholder="خریدار کا نام"
              value={buyer}
              onChange={(e) => setBuyer(e.currentTarget.value)}
              readOnly={variant === "VIEW_INVOICE"}
            />
            <label htmlFor="buyerName">&#58; خریدار</label>
          </div>
        </div>

        {/* ITEMSList LIST */}

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
              key={index}
              index={index}
              item={item}
              variant={variant}
              updateItem={updateItem}
              removeItem={removeItem}
            />
          ))}

        {/* add item button */}
        {variant === "NEW_INVOICE" && <AddItem handleClick={addItem} />}

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
              readOnly={variant === "VIEW_INVOICE"}
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
          <div className="w-1/2 text-right">
            <label htmlFor="invoiceNote" className="text-right pr-1">
              نوٹ
            </label>
            <br />
            <textarea
              placeholder=""
              value={invoiceNote}
              onChange={(e) => setInvoiceNote(e.target.value)}
              readOnly={variant === "VIEW_INVOICE"}
              className={`text-sm w-full border rounded-lg text-right h-28 px-2 overflow-hidden placeholder:pt-2 mt-1 ${
                variant === "VIEW_INVOICE" ? "outline-none" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
