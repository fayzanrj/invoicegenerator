"use client";
import handleApiError from "@/libs/server/HandleApiError";
import React, { useState } from "react";
import ScreenModal from "../shared/ScreenModal";
import Loader from "../shared/Loader";
import InvoiceProps from "@/props/InvoiceProps";
import useHeaders from "@/app/hooks/useHeaders";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import validateInvoiceData from "@/libs/server/ValidateInvoiceData";

const SaveButton: React.FC<InvoiceProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const headers = useHeaders();
  const router = useRouter();

  // Process to save invoice
  const handleClick = async () => {
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

      // API CALL
      const response = await axios.post("/api/invoice/saveInvoice", props, {
        headers,
      });

      toast.success(response.data.message);
      // Pushing to saved invoice
      router.push(`/dashboard/invoices/${response.data.invoiceNumber}`);
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
        className="mx-2 py-2 px-2 bg-[#009e74] rounded-md font-semibold text-white NO_PRINT"
        onClick={handleClick}
      >
        Save Invoice
      </button>
    </>
  );
};

export default SaveButton;
