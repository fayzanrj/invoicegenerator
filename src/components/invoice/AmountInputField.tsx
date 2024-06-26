import React, { ChangeEvent } from "react";
import { toast } from "sonner";

interface AmountInputFieldProps {
  id: "outstandingAmount" | "grandTotal" | "total";
  label: string;
  value: number;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
  readOnly?: boolean;
}

const AmountInputField: React.FC<AmountInputFieldProps> = ({
  id,
  label,
  value,
  setValue,
  readOnly = false,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(parseInt(e.currentTarget.value) || 0);
  };

  return (
    <div
      className={`py-2 pr-10 ${
        id === "grandTotal" ? "border border-gray-300" : ""
      }`}
    >
      <input
        type="number"
        id={id}
        value={value.toString()}
        readOnly={readOnly}
        onChange={handleChange}
        className={`w-32 text-right pr-7 font-sans ${
          readOnly ? "outline-none" : ""
        } `}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default AmountInputField;
