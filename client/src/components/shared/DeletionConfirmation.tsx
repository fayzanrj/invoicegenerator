"use client";
import React from "react";
import ButtonLayout from "./ButtonLayout";

// Base Props
interface DeletionConfirmationBaseProps {
  handleClick: () => void;
  closeModal: () => void;
}

// Props for acount deletion
interface DeletionConfirmationAccountProps
  extends DeletionConfirmationBaseProps {
  variant: "ACCOUNT";
}

// Props for invoice deletion
interface DeletionConfirmationInvoiceProps
  extends DeletionConfirmationBaseProps {
  variant: "INVOICE";
  invoiceNumber: number;
}

interface DeletionConfirmationUserProps extends DeletionConfirmationBaseProps {
  variant: "USER";
  username: string;
}

// Props
type DeletionConfirmationProps =
  | DeletionConfirmationAccountProps
  | DeletionConfirmationInvoiceProps
  | DeletionConfirmationUserProps;

const DeletionConfirmation: React.FC<DeletionConfirmationProps> = ({
  handleClick,
  closeModal,
  variant,
  ...props
}) => {
  // Extracting invoice number from invoice props
  const invoiceNumber = (props as DeletionConfirmationInvoiceProps)
    .invoiceNumber;

    // Extracting username from user props
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
        <ButtonLayout
          className="px-3 !text-black"
          background="transparent"
          onClick={closeModal}
        >
          Cancel
        </ButtonLayout>
        <ButtonLayout
          className="px-3"
          onClick={handleClick}
          background="danger"
        >
          {renderButtonText()}
        </ButtonLayout>
      </div>
    </div>
  );
};

export default DeletionConfirmation;
