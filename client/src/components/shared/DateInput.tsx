"use client";
import UrduFont from "@/constants/UrduFont";
import addZero from "@/libs/AddZero";
import getCurrentDate from "@/libs/GetCurrentDate";
import React, { useRef } from "react";

// Props
interface DateInputProps {
  date: string;
  setDate: (newDate: string) => void;
  variant: "INVOICE" | "DETAIL" | "SALE";
  subVariant:
    | "NEW_INVOICE"
    | "VIEW_INVOICE"
    | "EDIT_INVOICE"
    | "DRAFT"
    | "ADD SALE"
    | "SALES";
}



const DateInput: React.FC<DateInputProps> = ({
  date = getCurrentDate(),
  setDate,
  variant,
  subVariant,
}) => {
  // Creating a ref to reference the date input element
  const datePickerRef = useRef<HTMLInputElement>(null);

  // Checking if the browser is Safari
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // Handling changes to the date input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value) {
      const selectedDate = new Date(e.currentTarget.value);
      const newDate = `${addZero(selectedDate.getDate())}-${addZero(
        selectedDate.getMonth() + 1
      )}-${selectedDate.getFullYear()}`;

      setDate(newDate);
    } else {
      setDate(getCurrentDate());
    }
  };

  // Handling clicks on the text input to open the date picker
  const handleTextInputClick = () => {
    if (
      (subVariant === "NEW_INVOICE" ||
        subVariant === "EDIT_INVOICE" ||
        subVariant === "ADD SALE" ||
        subVariant === "SALES") &&
      datePickerRef.current
    ) {
      if (isSafari) {
        // Focusing and clicking the date input for Safari
        datePickerRef.current.focus();
        datePickerRef.current.click();
      } else {
        // Using the showPicker method for other browsers
        datePickerRef.current.showPicker();
      }
    }
  };

  return (
    <div className="text-center">
      {/* The actual date input element, hidden from view */}
      <input
        type="date"
        className="sr-only"
        ref={datePickerRef}
        onChange={handleChange}
      />
      {/* The button displaying the current date */}
      <button
        className={`${
          variant === "DETAIL"
            ? "w-20 text-xs font-semibold"
            : variant === "INVOICE"
            ? "w-24"
            : "text-2xl p-2 h-fit border-2 border-gray-300 mb-1 mt-3 outline-none rounded-md "
        } font-sans h-10 cursor-pointer outline-none`}
        onClick={handleTextInputClick}
      >
        {date}
      </button>
      {/* The label for the date input, conditionally hidden */}
      <label
        htmlFor={variant + "date"}
        className={
          variant === "DETAIL" ? "sr-only" : variant === "SALE" ? `${UrduFont} text-lg font-semibold mx-1` : ""
        }
      >
        &#58; تاریخ
      </label>
    </div>
  );
};

export default DateInput;
