"use client";
import handleApiError from "@/libs/HandleApiError";
import React, { useState } from "react";
import ScreenModal from "../shared/ScreenModal";
import Loader from "../shared/Loader";
import InvoiceProps from "@/props/InvoiceProps";
import useHeaders from "@/hooks/useHeaders";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import validateInvoiceData from "@/libs/ValidateInvoiceData";
import ButtonLayout from "../shared/ButtonLayout";
import ScreenLoader from "../shared/ScreenLoader";

// Props
interface SaveInvoiceButtonProps extends InvoiceProps {
  variant: "NEW_INVOICE" | "VIEW_INVOICE" | "EDIT_INVOICE" | "DRAFT";
}

const SaveInvoiceButton: React.FC<SaveInvoiceButtonProps> = ({
  variant,
  ...props
}) => {
  // State
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  const headers = useHeaders();
  const router = useRouter();

  // Process to save invoice
  const handleClick = async (invoiceType: "NEW" | "DRAFT") => {
    try {
      setIsLoading(true);
      const isCompleted = validateInvoiceData(props);

      if (!isCompleted) {
        toast.error("نامکمل ڈیٹا، براہ کرم تمام جگہوں کو پُر کریں۔", {
          style: {
            textAlign: "right",
          },
        });
        return;
      }

      const route =
        variant === "NEW_INVOICE" ? "SaveInvoiceButton" : "updateInvoice";

      const modifiedProps = {
        ...props,
        isDraft: invoiceType === "DRAFT",
      };

      // API CALL
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/invoices/${route}`,
        {
          invoice: modifiedProps,
        },
        {
          headers,
        }
      );

      toast.success(response.data.message);
      // Pushing to saved invoice
      router.push(
        invoiceType === "DRAFT"
          ? `/dashboard/invoices/drafts/${response.data.invoiceNumber}`
          : `/dashboard/invoices/${response.data.invoiceNumber}`
      );
    } catch (error) {
      console.error(error);
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Loading modal */}
      {isLoading && <ScreenLoader />}
      {/* Save button */}
      <ButtonLayout
        className="font-semibold text-white NO_PRINT"
        background="saveInvoice"
        onClick={() => handleClick("NEW")}
      >
        Save Invoice
      </ButtonLayout>
      {variant !== "DRAFT" && (
        <ButtonLayout
          className="font-semibold NO_PRINT"
          background="saveDraft"
          onClick={() => handleClick("DRAFT")}
        >
          Save as Draft
        </ButtonLayout>
      )}
    </>
  );
};

export default SaveInvoiceButton;
