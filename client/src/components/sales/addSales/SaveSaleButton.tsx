"use client";
import ScreenLoader from "@/components/shared/ScreenLoader";
import useHeaders from "@/hooks/useHeaders";
import handleApiError from "@/libs/HandleApiError";
import validateSalesData from "@/libs/ValidateSalesData";
import { AddSalesItemProps, SaleItemProps } from "@/props/SaleProps";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import ButtonLayout from "../../shared/ButtonLayout";

// Props
interface SaveSaleButtonProps {
  customerId: string;
  saleItems: AddSalesItemProps[];
  handleAddSales?: (sales: SaleItemProps[]) => void;
}

const SaveSaleButton: React.FC<SaveSaleButtonProps> = ({
  customerId,
  saleItems,
  handleAddSales,
}) => {
  // State
  const [isLoading, setIsLoading] = useState(false);

  // Hook
  const headers = useHeaders();
  const router = useRouter();

  // Function to save sale in database
  const saveSale = async () => {
    try {
      setIsLoading(true);

      const data = {
        customer: customerId,
        items: saleItems,
      };

      // Validating data;
      if (!validateSalesData(data)) {
        toast.error("نامکمل ڈیٹا، براہ کرم تمام جگہوں کو پُر کریں۔");
        return; // Early exit if data is not valid
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/sales/addSales`,
        {
          ...data,
        },
        {
          headers,
        }
      );

      toast.success(res.data.message);

      if (handleAddSales) {
        handleAddSales(res.data.sales);
      }
    } catch (error) {
      console.error(error);
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {/* LOADER  */}
      {isLoading && <ScreenLoader />}

      <ButtonLayout
        onClick={saveSale}
        disabled={isLoading}
        className="font-sans !px-6 text-lg font-semibold"
      >
        SAVE
      </ButtonLayout>
    </>
  );
};

export default SaveSaleButton;
