"use client";
import addZero from "@/libs/AddZero";
import React, { useRef } from "react";

// Props
interface DateInputProps {
  date: string;
  setDate: (newDate: string) => void;
  variant: "INVOICE" | "DETAIL";
  invoiceVariant: "NEW_INVOICE" | "VIEW_INVOICE" | "EDIT_INVOICE" | "DRAFT";
}

const currentDate = `${addZero(new Date().getDate())}-${addZero(
  new Date().getMonth() + 1
)}-${new Date().getFullYear()}`;

const DateInput: React.FC<DateInputProps> = ({
  date = currentDate,
  setDate,
  variant,
  invoiceVariant,
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
      setDate(currentDate);
    }
  };

  // Handling clicks on the text input to open the date picker
  const handleTextInputClick = () => {
    if (
      (invoiceVariant === "NEW_INVOICE" || invoiceVariant === "EDIT_INVOICE") &&
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
          variant === "DETAIL" ? "w-20 text-xs font-semibold" : "w-24 "
        } font-sans h-10 cursor-pointer outline-none`}
        onClick={handleTextInputClick}
      >
        {date}
      </button>
      {/* The label for the date input, conditionally hidden */}
      <label
        htmlFor={variant + "date"}
        className={variant === "DETAIL" ? "sr-only" : ""}
      >
        &#58; تاریخ
      </label>
    </div>
  );
};

export default DateInput;
