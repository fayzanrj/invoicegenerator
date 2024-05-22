"use client";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface InvoiceNoteProps {
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  variant: "NEW_INVOICE" | "VIEW_INVOICE" | "EDIT_INVOICE" | "DRAFT";
}

const InvoiceNote: React.FC<InvoiceNoteProps> = ({
  note,
  setNote,
  variant,
}) => {
  // Setting the initial state for showing or hiding the note
  const [showNote, setShowNote] = useState(!!note);

  // Function to open the note input
  const openNote = () => setShowNote(true);

  // Function to close the note input and clear the note
  const closeNote = () => {
    setShowNote(false);
    setNote("");
  };

  // If the note is not being shown and the variant is "NEW_INVOICE", it is rendering the button to add a note
  if (!showNote && (variant === "NEW_INVOICE" || variant === "EDIT_INVOICE")) {
    return (
      <button
        onClick={openNote}
        className="NO_PRINT border-2 h-10 text-xs rounded-lg border-black pb-2 px-2 bg-black text-white"
      >
        نوٹ شامل کریں <span className="text-lg font-bold">&#43;</span>
      </button>
    );
  }

  // Rendering the note input if showNote is true
  return (
    showNote && (
      <div className="w-1/2 text-right">
        {/* Close button for "NEW_INVOICE" variant */}
        {(variant === "NEW_INVOICE" || variant === "EDIT_INVOICE") && (
          <button className="NO_PRINT" onClick={closeNote}>
            <IoMdClose />
          </button>
        )}
        {/* Label for the note input */}
        <label htmlFor="invoiceNote" className="text-right pr-1">
          نوٹ
        </label>{" "}
        <br />
        {/* Textarea for the note input */}
        <textarea
          placeholder=""
          value={note}
          onChange={(e) => setNote(e.target.value)}
          readOnly={variant === "VIEW_INVOICE"}
          className={`text-sm w-full border rounded-lg text-right h-28 px-2 overflow-hidden placeholder:pt-2 mt-1 ${
            variant === "VIEW_INVOICE" || variant === "DRAFT"
              ? "outline-none"
              : ""
          }`}
        />
      </div>
    )
  );
};

export default InvoiceNote;
