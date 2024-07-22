"use client";
import React from "react";
import ButtonLayout from "../shared/ButtonLayout";

// Props
interface AddItemProps {
  handleClick: () => void;
}

const AddItem: React.FC<AddItemProps> = ({ handleClick }) => {
  return (
    <div className="text-right my-1">
      <ButtonLayout
        onClick={handleClick}
      >
        شامل کریں <span className="text-lg font-bold">&#43;</span>
      </ButtonLayout>
    </div>
  );
};

export default AddItem;
