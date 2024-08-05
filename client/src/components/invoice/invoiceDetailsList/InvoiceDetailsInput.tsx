import UrduFont from "@/constants/UrduFont";
import React, { ChangeEvent } from "react";

// Labels
const labels: Record<InvoiceDetailsInputProps["id"], string> = {
  builtyNo: "Builty Number",
  quantity: "Quantity",
  total: "Total Amount",
  rate: "Rate",
  details: "Details",
};

// Common props
interface InvoiceDetailsInputProps {
  value: string | number;
  id: "builtyNo" | "quantity" | "total" | "rate" | "details";
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
}

const InvoiceDetailsInput: React.FC<InvoiceDetailsInputProps> = ({
  id,
  value,
  onChange = () => {},
  readOnly = false,
  placeHolder = "",
}) => {
  // Input type
  const type = id === "builtyNo" || id === "details" ? "text" : "number";

  return (
    <>
      <label className="sr-only">{labels[id]}</label>
      <input
        id={id}
        type={type}
        readOnly={readOnly}
        aria-label="builtyNo"
        onChange={onChange}
        placeholder={placeHolder}
        value={value}
        className={` w-full min-h-12 border h-full rounded-lg font-sans inputBorder outline-none ${
          id === "details" ? `text-right ${UrduFont}` : "text-center"
        }`}
        spellCheck={"false"}
        list={id === "details" ? "allProducts" : ""}
      />
    </>
  );
};

export default InvoiceDetailsInput;
