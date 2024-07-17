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

interface SaveButtonProps extends InvoiceProps {
  variant: "NEW_INVOICE" | "VIEW_INVOICE" | "EDIT_INVOICE" | "DRAFT";
}

const SaveButton: React.FC<SaveButtonProps> = ({ variant, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
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

      const route = variant === "NEW_INVOICE" ? "saveInvoice" : "updateInvoice";

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
        `/dashboard/${invoiceType === "DRAFT" ? "drafts" : "invoices"}/${
          response.data.invoiceNumber
        }`
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
      {isLoading && (
        <ScreenModal isLoader>
          <Loader />
        </ScreenModal>
      )}
      {/* Save button */}
      <button
        className="my-1 py-2 px-2 bg-[#009e74] rounded-md font-semibold text-white NO_PRINT"
        onClick={() => handleClick("NEW")}
      >
        Save Invoice
      </button>
      {variant !== "DRAFT" && (
        <button
          className="my-1 py-2 px-2 bg-[#FFA500] rounded-md font-semibold text-white NO_PRINT"
          onClick={() => handleClick("DRAFT")}
        >
          Save as Draft
        </button>
      )}
    </>
  );
};

// 009e74
export default SaveButton;
