"use client";
import React from "react";

// Props
interface DeletionConfirmationProps {
  handleClick: () => void;
  closeModal: () => void;
}

// Props for acount deletion
interface DeletionConfirmationAccountProps extends DeletionConfirmationProps {
  variant: "ACCOUNT";
}

// Props for invoice deletion
interface DeletionConfirmationInvoiceProps extends DeletionConfirmationProps {
  variant: "INVOICE";
  invoiceNumber: number;
}

interface DeletionConfirmationUserProps extends DeletionConfirmationProps {
  variant: "USER";
  username: string;
}

const DeletionConfirmation: React.FC<
  | DeletionConfirmationAccountProps
  | DeletionConfirmationInvoiceProps
  | DeletionConfirmationUserProps
> = ({ handleClick, closeModal, variant, ...props }) => {
  const invoiceNumber = (props as DeletionConfirmationInvoiceProps)
    .invoiceNumber;

  const username = (props as DeletionConfirmationUserProps).username;

  // For text
  const renderText = () => {
    switch (variant) {
      case "ACCOUNT":
        return "delete your account?";
      case "INVOICE":
        return `delete invoice# ${invoiceNumber}?`;
      case "USER":
        return `remove ${username}?`;
      default:
        return "delete";
    }
  };

  // For button
  const renderButtonText = () => {
    switch (variant) {
      case "ACCOUNT":
        return "Delete Account";
      case "INVOICE":
        return `Delete Invoice# ${invoiceNumber}`;
      case "USER":
        return `Remove ${
          username.length > 10 ? username.slice(0, 8) + "..." : username
        }`;
      default:
        return "Delete";
    }
  };

  return (
    <div className="w-[95%] max-w-96 p-4 bg-white shadow-xl rounded-xl">
      <div className="pt-1 pb-3 border-b border-gray-400 text-left">
        <h3 className="text-xl font-semibold">
          {variant === "USER" ? "Remove" : "Deletion"} Confirmation
        </h3>
      </div>
      <div className="my-6 text-left">
        <p>
          Are you sure you want to{" "}
          <span className="font-semibold">{renderText()}</span>
        </p>
        <p className="text-sm font-bold">This action is irreversible.</p>
      </div>
      <div className="text-right">
        <button className="py-1 px-3" onClick={closeModal}>
          Cancel
        </button>
        <button
          className="py-1.5 px-3 bg-red-600 text-white rounded-md"
          onClick={handleClick}
        >
          {renderButtonText()}
        </button>
      </div>
    </div>
  );
};

export default DeletionConfirmation;
