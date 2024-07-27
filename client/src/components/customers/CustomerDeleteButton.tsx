"use client";
import useHeaders from "@/hooks/useHeaders";
import handleApiError from "@/libs/HandleApiError";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import ButtonLayout from "../shared/ButtonLayout";
import DeletionConfirmation from "../shared/DeletionConfirmation";
import ScreenLoader from "../shared/ScreenLoader";
import ScreenModal from "../shared/ScreenModal";
import UrduFont from "@/constants/UrduFont";

// Props
interface CustomerDeleteButtonProps {
  customerId: string;
  customerName: string;
}

const CustomerDeleteButton: React.FC<CustomerDeleteButtonProps> = ({
  customerId,
  customerName,
}) => {
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
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/customers/deactivate/${customerId}`,{},
        { headers }
      );

      toast.success(res.data.message);
      router.push("/dashboard/customers");
    } catch (error) {
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
      {isLoading && <ScreenLoader />}

      {/* Confirmation modal */}
      {isModalOpen && (
        <DeletionConfirmation
          closeModal={closeModal}
          handleClick={handleClick}
          variant="CUSTOMER"
          customerName={customerName}
        />
      )}

      {/* Delete button */}
      {session?.user.role === "admin" && (
        <ButtonLayout
          onClick={() => setIsModalOpen(true)}
          background="danger"
          className={`${UrduFont} font-semibold`}
        >
          گاہک کو حذف کریں
        </ButtonLayout>
      )}
    </>
  );
};

export default CustomerDeleteButton;
