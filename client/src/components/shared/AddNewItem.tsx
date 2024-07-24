"use client";
import React from "react";
import ButtonLayout from "./ButtonLayout";
import UrduFont from "@/constants/UrduFont";

// Props
interface AddNewItemProps {
  handleClick: () => void;
}

const AddNewItem: React.FC<AddNewItemProps> = ({ handleClick }) => {
  return (
    <div className={`${UrduFont} text-right my-1`}>
      <ButtonLayout
        onClick={handleClick}
      >
        شامل کریں <span className="text-lg font-bold">&#43;</span>
      </ButtonLayout>
    </div>
  );
};

export default AddNewItem;
