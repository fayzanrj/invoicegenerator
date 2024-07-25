"use client";
import React, { useState } from "react";
import ButtonLayout from "../../shared/ButtonLayout";
import { AddSalesItemProps } from "@/props/SaleProps";
import handleApiError from "@/libs/HandleApiError";
import useHeaders from "@/hooks/useHeaders";
import axios from "axios";
import validateSalesData from "@/libs/ValidateSalesData";
import { toast } from "sonner";
import ScreenLoader from "@/components/shared/ScreenLoader";

// Props
interface SaveSaleButtonProps {
  customerId: string;
  saleItems: AddSalesItemProps[];
}

const SaveSaleButton: React.FC<SaveSaleButtonProps> = ({
  customerId,
  saleItems,
}) => {
  // State
  const [isLoading, setIsLoading] = useState(false);

  // Hook
  const headers = useHeaders();

  // Function to save invoice in database
  const saveSale = async () => {
    try {
      setIsLoading(true);

      const data = {
        customer: customerId,
        items: saleItems,
      };

      // Valodatong data
      const isValidData = validateSalesData(data);
      if (!isValidData) {
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
