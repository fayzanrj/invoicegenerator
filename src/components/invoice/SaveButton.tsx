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

const SaveButton: React.FC<InvoiceProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const headers = useHeaders();
  const router = useRouter();

  // Process to save invoice
  const handleClick = async () => {
    try {
      setIsLoading(true);
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
        className="py-2 px-2 bg-[#009e74] rounded-md font-semibold text-white"
        onClick={handleClick}
      >
        Save Invoice
      </button>
    </>
  );
};

export default SaveButton;
