"use client";
import React from "react";

interface AddItemProps {
  handleClick: () => void;
}

const AddItem: React.FC<AddItemProps> = ({ handleClick }) => {
  return (
    <div className="text-right my-1">
      <button
        onClick={handleClick}
        className="AddButton border-2 text-xs rounded-lg border-black pb-2 px-2 bg-black text-white"
      >
        شامل کریں <span className="text-lg font-bold">&#43;</span>
      </button>
    </div>
  );
};

export default AddItem;
