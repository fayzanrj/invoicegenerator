import React, { useState } from "react";
import ButtonLayout from "../shared/ButtonLayout";
import { MdAdd, MdEdit } from "react-icons/md";
import UrduFont from "@/constants/UrduFont";
import AddBuiltyNumberForm from "./AddBuiltyNumberForm";

// Props
interface AddBuiltyNumberButtonProps {
  saleId: string;
  builtyNumber: string;
  handleAddBuiltNumber: (newBuiltyNumber: string) => void;
}

const AddBuiltyNumberButton: React.FC<AddBuiltyNumberButtonProps> = ({
  saleId,
  builtyNumber,
  handleAddBuiltNumber,
}) => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open and close modal
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      {isModalOpen && (
        <AddBuiltyNumberForm
          closeModal={toggleModal}
          saleId={saleId}
          handleAddBuiltNumber={handleAddBuiltNumber}
        />
      )}

      <ButtonLayout
        onClick={toggleModal}
        className={`${
          builtyNumber ? "font-sans !text-black" : UrduFont
        } !h-fit py-1 !my-0`}
        background={builtyNumber ? "transparent" : "primary"}
      >
        {builtyNumber ? (
          <>
            {builtyNumber} <MdEdit className="inline-block" />
          </>
        ) : (
          <>
            <span>
              <MdAdd className="inline-block" />
            </span>
            بلٹی نمبر{" "}
          </>
        )}
      </ButtonLayout>
    </>
  );
};

export default AddBuiltyNumberButton;
