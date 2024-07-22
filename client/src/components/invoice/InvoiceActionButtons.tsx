import InvoiceProps from "@/props/InvoiceProps";
import Link from "next/link";
import React from "react";
import DeleteButton from "./DeleteButton";
import PrintAndDownloadButton from "./PrintAndDownloadButton";
import SaveButton from "./SaveButton";
import ButtonLayout from "../shared/ButtonLayout";

const CreateNewButton = () => (
  <Link href="/dashboard/invoices/createInvoice">
    <ButtonLayout isNav className="font-semibold">
      Create new invoice
    </ButtonLayout>
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

      {/* IF NEW INVOICE PAGE IS OPEN */}
      {variant === "NEW_INVOICE" && <SaveButton variant={variant} {...props} />}

      {/* IF VIEW IMVOICE PAGE IS OPEN */}
      {variant === "VIEW_INVOICE" && (
        <>
          <DeleteButton isDraft={false} invoiceNumber={props.invoiceNumber} />
          <CreateNewButton />
        </>
      )}

      {/* IF INVOICE IS DRAFT OR EDIT INVOICE PAGE IS OPENED */}
      {(variant === "EDIT_INVOICE" || variant === "DRAFT") && (
        <>
          <DeleteButton isDraft invoiceNumber={props.invoiceNumber} />
          <SaveButton variant={variant} {...props} />
          {variant === "DRAFT" && (
            <Link
              href={`/dashboard/invoices/drafts/${props.invoiceNumber}/edit`}
            >
              <ButtonLayout isNav background="editInvoice" className="font-semibold">
                Edit Draft
              </ButtonLayout>
            </Link>
          )}
          <CreateNewButton />
        </>
      )}
    </div>
  );
};

export default InvoiceActionButtons;
