import InvoiceProps from "@/props/InvoiceProps";
import React from "react";
import SaveButton from "./SaveButton";
import DeleteButton from "./DeleteButton";
import PrintAndDownloadButton from "./PrintAndDownloadButton";
import Link from "next/link";

const CreateNewButton = () => (
  <Link href="/dashboard/createInvoice">
    <button className="my-1 py-2 px-2 bg-black rounded-md font-semibold text-white NO_PRINT">
      Create new invoice
    </button>
  </Link>
);

// Props
interface InvoiceActionButtonsProps extends InvoiceProps {
  variant: "NEW_INVOICE" | "VIEW_INVOICE" | "EDIT_INVOICE" | "DRAFT";
}

const InvoiceActionButtons: React.FC<InvoiceActionButtonsProps> = ({
  variant,
  ...props
}) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {/* Rendering the PrintAndDownloadButton for all variants */}
      <PrintAndDownloadButton />

      {/* Conditional rendering based on the variant */}
      {variant === "NEW_INVOICE" && <SaveButton variant={variant} {...props} />}

      {variant === "VIEW_INVOICE" && (
        <>
          <DeleteButton invoiceNumber={props.invoiceNumber} />
          <CreateNewButton />
        </>
      )}

      {(variant === "EDIT_INVOICE" || variant === "DRAFT") && (
        <>
          <SaveButton variant={variant} {...props} />
          {variant === "DRAFT" && (
            <Link href={`/dashboard/drafts/${props.invoiceNumber}/edit`}>
              <button className="my-1 py-2 px-2 bg-[#4682B4] rounded-md font-semibold text-white NO_PRINT">
                Edit Draft
              </button>
            </Link>
          )}
          <CreateNewButton />
        </>
      )}
    </div>
  );
};

export default InvoiceActionButtons;
