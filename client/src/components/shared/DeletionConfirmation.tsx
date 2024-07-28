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

// Props for user deletion
interface DeletionConfirmationUserProps extends DeletionConfirmationBaseProps {
  variant: "USER";
  username: string;
}

// Props for customer deletion
interface DeletionConfirmationCustomerProps
  extends DeletionConfirmationBaseProps {
  variant: "CUSTOMER";
  customerName: string;
}

// Props for sale deletion
interface DeletionConfirmationSaleProps extends DeletionConfirmationBaseProps {
  variant: "SALE";
  customerName: string;
  details: string;
  date: string;
}

// Props
type DeletionConfirmationProps =
  | DeletionConfirmationAccountProps
  | DeletionConfirmationInvoiceProps
  | DeletionConfirmationUserProps
  | DeletionConfirmationCustomerProps
  | DeletionConfirmationSaleProps;

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

  // Extracting customer name from customer props
  const customerName = (props as DeletionConfirmationCustomerProps)
    .customerName;

  // Extracting sale details from sale props
  const saleCustomerName = (props as DeletionConfirmationSaleProps)
    .customerName;
  const saleDetails = (props as DeletionConfirmationSaleProps).details;
  const saleDate = (props as DeletionConfirmationSaleProps).date;

  // For text
  const renderText = () => {
    switch (variant) {
      case "ACCOUNT":
        return "اپنا اکاؤنٹ حذف کریں؟";
      case "INVOICE":
        return (
          <>
            بل نمبر <span className="font-sans">{invoiceNumber}</span> کو حذف
            کریں؟
          </>
        );
      case "USER":
        return "صارف کو ہٹائیں؟";
      case "CUSTOMER":
        return `گاہک ${customerName} کو ہٹائیں؟`;
      case "SALE":
        return (
          <>
            <span className="font-sans">{saleDate}</span>
            <span className={UrduFont}>
              {`کو ${saleCustomerName} کو ${saleDetails} کی گئی فروخت کو حذف کریں؟`}
            </span>
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
            کو ہٹائیں{" "}
            <span className="font-sans">
              {username.length > 10 ? username.slice(0, 8) + "..." : username}
            </span>{" "}
          </>
        );
      case "CUSTOMER":
        return `${customerName} کو ہٹائیں`;
      default:
        return "حذف کریں";
    }
  };

  return (
    <ScreenModal closeModal={closeModal} showCancel={false} isForm>
      <div className="w-[95%] max-w-96 p-4 bg-white shadow-xl rounded-xl">
        <div className="pt-1 pb-3 border-b border-gray-400 text-right">
          <h3 className={`text-xl font-semibold ${UrduFont}`}>
            {variant === "USER" || variant === "CUSTOMER" || variant === "SALE"
              ? "ہٹانے کی تصدیق"
              : "حذف کرنے کی تصدیق"}
          </h3>
        </div>
        <div className="my-6 text-right">
          <p className={`${UrduFont} leading-8`}>
            کیا آپ واقعی چاہتے ہیں کہ {renderText()}
          </p>
          <p className={`text-sm font-bold my-4 ${UrduFont}`}>
            یہ عمل ناقابل واپسی ہے۔
          </p>
        </div>
        <div className="text-right">
          <ButtonLayout
            className={`px-3 !text-black ${UrduFont}`}
            background="transparent"
            onClick={closeModal}
          >
            منسوخ کریں
          </ButtonLayout>
          <ButtonLayout
            className={`px-3 ${UrduFont}`}
            onClick={handleClick}
            background="danger"
          >
            {renderButtonText()}
          </ButtonLayout>
        </div>
      </div>
    </ScreenModal>
  );
};

export default DeletionConfirmation;
