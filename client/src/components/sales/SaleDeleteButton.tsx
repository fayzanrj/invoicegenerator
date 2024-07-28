"use client";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import DeletionConfirmation from "../shared/DeletionConfirmation";
import useHeaders from "@/hooks/useHeaders";
import handleApiError from "@/libs/HandleApiError";
import axios from "axios";
import { toast } from "sonner";
import ScreenLoader from "../shared/ScreenLoader";
import { useRouter } from "next/navigation";

// Props
interface SaleDeleteButtonProps {
  saleId: string;
  customerName: string;
  details: string;
  date: string;
  handleRemove: (id: string) => void;
}

const SaleDeleteButton: React.FC<SaleDeleteButtonProps> = ({
  customerName,
  date,
  details,
  saleId,
  handleRemove,
}) => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  const headers = useHeaders();
  const router = useRouter();

  // Function to delete sale
  const handleDelete = async () => {
    try {
      setIsModalOpen(false);
      setIsLoading(true);
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/sales/deleteSale/${saleId}`,
        {
          headers,
        }
      );

      toast.success(res.data.message);
      await handleRemove(saleId);
      router.refresh();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <ScreenLoader />}

      {isModalOpen && (
        <DeletionConfirmation
          variant="SALE"
          closeModal={() => setIsModalOpen(false)}
          customerName={customerName}
          date={date}
          details={details}
          handleClick={handleDelete}
        />
      )}
      <button onClick={() => setIsModalOpen(true)}>
        <MdDelete className="inlin-block text-red-500" size={"1.4rem"} />
      </button>
    </>
  );
};

export default SaleDeleteButton;
