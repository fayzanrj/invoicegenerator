import { InvoiceTypeProps } from "@/props/InvoiceProps";
import Image from "next/image";
import React from "react";
import { RiWhatsappFill } from "react-icons/ri";

// Props
interface CompanyInfoInvoiceNumberProps {
  invoiceNumber: number;
  invoiceType: InvoiceTypeProps;
  setInvoiceType: React.Dispatch<React.SetStateAction<InvoiceTypeProps | null>>;
  variant: "NEW_INVOICE" | "VIEW_INVOICE" | "EDIT_INVOICE" | "DRAFT";
}

const CompanyInfoInvoiceNumber: React.FC<CompanyInfoInvoiceNumberProps> = ({
  invoiceNumber,
  invoiceType,
  setInvoiceType,
  variant,
}) => {
  const renderInvoiceHeading = () => {
    switch (invoiceType) {
      case "circle":
        return "سرکل بل";
      case "tapayi":
        return "گلشن  تپائی مرکز";
      case "waterset":
      default:
        return "گلشن سٹین لیس سٹیل";
    }
  };

  // Function to reset invoice type
  const handleChangeInoviceType = () => setInvoiceType(null);

  return (
    <>
      {/* Invoice number and logo */}
      <div className="flex justify-between items-center">
        <p className="w-[25%] text-left">
          <span className="font-semibold font-sans">{invoiceNumber}</span> #بل
          نمبر
        </p>

        {/* Name */}
        <div className="w-1/2 text-center relative">
          <h2 className="text-3xl tracking-tighter font-bold text-center">
            {renderInvoiceHeading()}
          </h2>
          {(variant === "EDIT_INVOICE" || variant === "NEW_INVOICE") && (
            <button onClick={handleChangeInoviceType} className="NO_PRINT absolute top-14 bg-black text-white rounded-md px-1 py-1.5 text-sm -translate-x-1/2 left-1/2">
              بل بدلیں
            </button>
          )}
        </div>

        <div className="w-[25%] text-right relative">
          <Image
            src={"/logo.jpg"}
            alt="logo"
            width={110}
            height={100}
            className="float-right"
          />
        </div>
      </div>

      {/* Comapny Info */}
      <div className="text-right my-2">
        {/* Address */}
        <p className="text-sm mt-4 mb-3">
          گلی نمبر4، عثمانِ غنی کالونی، نوشہرہ روڈ گوجرانوالہ
        </p>
        {/* Contact number */}
        <p className="text-sm font-sans font-semibold">
          0300-8112024
          <span className="ml-1.5">
            <RiWhatsappFill
              size={"1.15rem"}
              className="inline-block align-middle"
            />
          </span>
        </p>
      </div>
    </>
  );
};

export default CompanyInfoInvoiceNumber;
