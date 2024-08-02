import UrduFont from "@/constants/UrduFont";
import React from "react";
import ButtonLayout from "../shared/ButtonLayout";
import renderInvoiceType from "@/libs/GetInvoiceType";
import { InvoiceTypeProps } from "@/props/InvoiceProps";

// Props
interface InvoiceTypeHeadingProps {
  invoiceType: InvoiceTypeProps;
  setInvoiceType: React.Dispatch<React.SetStateAction<InvoiceTypeProps | null>>;

  variant: "NEW_INVOICE" | "VIEW_INVOICE" | "EDIT_INVOICE" | "DRAFT";
}

const InvoiceTypeHeading: React.FC<InvoiceTypeHeadingProps> = ({
  invoiceType,
  setInvoiceType,
  variant,
}) => {
  return (
    <div className={`${UrduFont} py-6 NO_PRINT`}>
      {(variant === "NEW_INVOICE" || variant === "EDIT_INVOICE") && (
        <ButtonLayout
          onClick={() => setInvoiceType(null)}
          className="!text-sm !h-fit py-3"
        >
          بدلیں
        </ButtonLayout>
      )}
      <h1 className={`text-3xl inline-block`}>
        {renderInvoiceType(invoiceType)}
      </h1>
    </div>
  );
};

export default InvoiceTypeHeading;
