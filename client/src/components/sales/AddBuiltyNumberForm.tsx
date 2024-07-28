import React, { useState } from "react";
import ScreenModal from "../shared/ScreenModal";
import FormLayout from "../shared/FormLayout";
import StateInputField from "../shared/StateInputField";
import UrduFont from "@/constants/UrduFont";
import handleApiError from "@/libs/HandleApiError";
import useHeaders from "@/hooks/useHeaders";
import axios from "axios";
import { toast } from "sonner";

// Props
interface AddBuiltyNumberFormProps {
  closeModal: () => void;
  saleId: string;
  handleAddBuiltNumber: (newBuityNumber: string) => void;
}

const AddBuiltyNumberForm: React.FC<AddBuiltyNumberFormProps> = ({
  closeModal,
  saleId,
  handleAddBuiltNumber,
}) => {
  // States
  const [builtyNumber, setBuiltyNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hook
  const headers = useHeaders();

  // Function to handle name
  const handleBuiltyChange = (text: string) => setBuiltyNumber(text);

  // Function to handle submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/sales/addBuiltyNo/${saleId}`,
        { newBuiltyNo: builtyNumber },
        { headers }
      );
      handleAddBuiltNumber(builtyNumber);
      toast.success(res.data.message);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };
  return (
    <ScreenModal isForm closeModal={closeModal} showCancel>
      <FormLayout
        variant="ADD BUILTY NUMBER"
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <StateInputField
          id="builtNum"
          label="بلٹی نمبر"
          onChange={handleBuiltyChange}
          placeholder="بلٹی نمبر لکھیں"
          value={builtyNumber}
          className={builtyNumber.length > 0 ? "font-sans" : UrduFont}
          required
          srOnly
        />
      </FormLayout>
    </ScreenModal>
  );
};

export default AddBuiltyNumberForm;
