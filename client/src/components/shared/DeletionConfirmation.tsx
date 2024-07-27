"use client";
import React from "react";
import ButtonLayout from "./ButtonLayout";
import UrduFont from "@/constants/UrduFont";
import ScreenModal from "./ScreenModal";

// Base Props
interface DeletionConfirmationBaseProps {
  handleClick: () => void;
  closeModal: () => void;
}

// Props for account deletion
interface DeletionConfirmationAccountProps extends DeletionConfirmationBaseProps {
  variant: "ACCOUNT";
}

// Props for invoice deletion
interface DeletionConfirmationInvoiceProps extends DeletionConfirmationBaseProps {
  variant: "INVOICE";
  invoiceNumber: number;
}

// Props for user deletion
interface DeletionConfirmationUserProps extends DeletionConfirmationBaseProps {
  variant: "USER";
  username: string;
}

// Props for customer deletion
interface DeletionConfirmationCustomerProps extends DeletionConfirmationBaseProps {
  variant: "CUSTOMER";
  customerName: string;
}

// Props
type DeletionConfirmationProps =
  | DeletionConfirmationAccountProps
  | DeletionConfirmationInvoiceProps
  | DeletionConfirmationUserProps
  | DeletionConfirmationCustomerProps;

const DeletionConfirmation: React.FC<DeletionConfirmationProps> = ({
  handleClick,
  closeModal,
  variant,
  ...props
}) => {
  // Extracting invoice number from invoice props
  const invoiceNumber = (props as DeletionConfirmationInvoiceProps).invoiceNumber;

  // Extracting username from user props
  const username = (props as DeletionConfirmationUserProps).username;

  // Extracting customer name from customer props
  const customerName = (props as DeletionConfirmationCustomerProps).customerName;

  // For text
  const renderText = () => {
    switch (variant) {
      case "ACCOUNT":
        return "اپنا اکاؤنٹ حذف کریں؟";
      case "INVOICE":
        return (
          <>
            بل نمبر <span className="font-sans">{invoiceNumber}</span> حذف کریں؟
          </>
        );
      case "USER":
        return (
          <>
            صارف <span className="font-sans">{username}</span> کو ہٹائیں؟
          </>
        );
      case "CUSTOMER":
        return (
          <>
            گاہک <span className="font-sans">{customerName}</span> کو ہٹائیں؟
          </>
        );
      default:
        return "حذف کریں";
    }
  };

  // For button
  const renderButtonText = () => {
    switch (variant) {
      case "ACCOUNT":
        return "اکاؤنٹ حذف کریں";
      case "INVOICE":
        return (
          <>
            بل نمبر <span className="font-sans">{invoiceNumber}</span> حذف کریں
          </>
        );
      case "USER":
        return (
          <>
            صارف{" "}
            <span className="font-sans">
              {username.length > 10 ? username.slice(0, 8) + "..." : username}
            </span>{" "}
            کو ہٹائیں
          </>
        );
      case "CUSTOMER":
        return (
          <>
            گاہک{" "}
            <span className="font-sans">
              {customerName.length > 10 ? customerName.slice(0, 8) + "..." : customerName}
            </span>{" "}
            کو ہٹائیں
          </>
        );
      default:
        return "حذف کریں";
    }
  };

  return (
    <ScreenModal closeModal={closeModal} showCancel={false} isForm>
      <div className="w-[95%] max-w-96 p-4 bg-white shadow-xl rounded-xl">
        <div className="pt-1 pb-3 border-b border-gray-400 text-right">
          <h3 className={`text-xl font-semibold ${UrduFont}`}>
            {variant === "USER" || variant === "CUSTOMER" ? "ہٹانے کی تصدیق" : "حذف کرنے کی تصدیق"}
          </h3>
        </div>
        <div className="my-6 text-right">
          <p className={UrduFont}>
            کیا آپ واقعی چاہتے ہیں کہ <span className="font-semibold">{renderText()}</span>
          </p>
          <p className={`text-sm font-bold my-4 ${UrduFont}`}>یہ عمل ناقابل واپسی ہے۔</p>
        </div>
        <div className="text-right">
          <ButtonLayout className={`px-3 !text-black ${UrduFont}`} background="transparent" onClick={closeModal}>
            منسوخ کریں
          </ButtonLayout>
          <ButtonLayout className={`px-3 ${UrduFont}`} onClick={handleClick} background="danger">
            {renderButtonText()}
          </ButtonLayout>
        </div>
      </div>
    </ScreenModal>
  );
};

export default DeletionConfirmation;
