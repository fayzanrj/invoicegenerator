"use client";
import useHeaders from "@/hooks/useHeaders";
import handleApiError from "@/libs/HandleApiError";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import DeletionConfirmation from "../shared/DeletionConfirmation";
import Loader from "../shared/Loader";
import ScreenModal from "../shared/ScreenModal";
import { useSession } from "next-auth/react";
import ButtonLayout from "../shared/ButtonLayout";

// Props
interface DeleteButtonProps {
  invoiceNumber: number;
  isDraft: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ invoiceNumber ,isDraft}) => {
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hooks
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/invoices/deleteInvoice/${invoiceNumber}`,
        { headers }
      );

      toast.success(res.data.message);
      router.push(
        isDraft ? "/dashboard/invoices/drafts" : "/dashboard/invoices"
      );
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
        <ButtonLayout
          onClick={() => setIsModalOpen(true)}
          background="danger"
          className="font-semibold"
        >
          Delete Invoice
        </ButtonLayout>
      )}
    </>
  );
};

export default DeleteButton;
