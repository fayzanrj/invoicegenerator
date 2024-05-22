"use client";
import useHeaders from "@/hooks/useHeaders";
import handleApiError from "@/libs/server/HandleApiError";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import DeletionConfirmation from "../shared/DeletionConfirmation";
import Loader from "../shared/Loader";
import ScreenModal from "../shared/ScreenModal";
import { useSession } from "next-auth/react";

interface DeleteButtonProps {
  invoiceNumber: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ invoiceNumber }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const headers = useHeaders();
  const router = useRouter();
  const { data: session } = useSession();

  // Process to delete invoice
  const handleClick = async () => {
    try {
      setIsLoading(true);
      setIsModalOpen(false);

      // API CALL
      const res = await axios.delete(
        `/api/invoice/deleteInvoice/${invoiceNumber}`,
        { headers }
      );

      toast.success(res.data.message);
      router.push("/dashboard/invoices");
    } catch (error) {
      console.error(error);
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to close modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Loading modal */}
      {isLoading && (
        <ScreenModal isLoader>
          <Loader />
        </ScreenModal>
      )}

      {/* Confirmation modal */}
      {isModalOpen && (
        <ScreenModal closeModal={closeModal} showCancel={false} isForm>
          <DeletionConfirmation
            variant="INVOICE"
            handleClick={handleClick}
            closeModal={closeModal}
            invoiceNumber={invoiceNumber}
          />
        </ScreenModal>
      )}

      {/* Delete button */}
      {session?.user.role === "admin" && (
        <button
          className="my-1 py-2 px-2  bg-red-600 rounded-md font-semibold text-white NO_PRINT"
          onClick={() => setIsModalOpen(true)}
        >
          Delete Invoice
        </button>
      )}
    </>
  );
};

export default DeleteButton;
