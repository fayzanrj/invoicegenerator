"use client";

import CustomerProps from "@/props/CustomerProps";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ButtonLayout from "../shared/ButtonLayout";
import AddCustomerModal from "./AddCustomerModal";
import UrduFont from "@/constants/UrduFont";

// Props
interface AddCustomerButtonProps {
  addCustomerToList: (customer: CustomerProps) => void;
}

const AddCustomerButton: React.FC<AddCustomerButtonProps> = ({
  addCustomerToList,
}) => {
  // Hook for params
  const params = useSearchParams();
  // States 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(
    !!params.get("addNew") // opening modal if params includes addNew
  );

  // Function to open and close modal
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      <section id="addNewCustomerSection" className="text-right">
        {/* NEW CUSTOMER MODAL */}
        {isModalOpen && (
          <AddCustomerModal
            closeModal={toggleModal}
            addCustomerToList={addCustomerToList}
          />
        )}

        {/* BUTTON TO OPEN MODAL */}
        <ButtonLayout
          onClick={toggleModal}
          className={`${UrduFont} px-5 ml-auto`}
        >
          نیا کسٹمر شامل کریں
        </ButtonLayout>
      </section>
    </>
  );
};

export default AddCustomerButton;
