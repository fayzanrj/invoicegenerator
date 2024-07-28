"use client";
import React, { useState } from "react";
import ScreenModal from "../shared/ScreenModal";
import FormLayout from "../shared/FormLayout";
import StateInputField from "../shared/StateInputField";
import axios from "axios";
import useHeaders from "@/hooks/useHeaders";
import { toast } from "sonner";
import CustomerProps from "@/props/CustomerProps";
import handleApiError from "@/libs/HandleApiError";
import UrduFont from "@/constants/UrduFont";

// Props
interface AddCustomerModalProps {
  closeModal: () => void;
  addCustomerToList: (customer: CustomerProps) => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  addCustomerToList,
  closeModal,
}) => {
  // States
  const [customerName, setCustomerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hook
  const headers = useHeaders();

  // Function to handle name
  const handleNameChange = (text: string) => setCustomerName(text);

  //   Function to save customer
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      // API CALL
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/customers/addCustomer`,
        { customerName },
        { headers }
      );

      toast.success(res.data.message);

      // Adding new customer to list and closing Modal
      addCustomerToList(res.data.customer);
      closeModal();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenModal isForm closeModal={closeModal} showCancel>
      <FormLayout
        variant="ADD CUSTOMER"
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <StateInputField
          id="addCustomer"
          label="گاہک کا نام"
          placeholder="گاہک کا نام لکھیں"
          value={customerName}
          onChange={handleNameChange}
          className={UrduFont}
          required
          srOnly
        />
      </FormLayout>
    </ScreenModal>
  );
};

export default AddCustomerModal;
