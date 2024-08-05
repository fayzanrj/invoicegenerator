"use client";
import React from "react";
import { IoMdClose } from "react-icons/io";

// Props
interface RemoveItemButtonProps {
  handleRemove: () => void;
}

const RemoveItemButton: React.FC<RemoveItemButtonProps> = ({
  handleRemove,
}) => {
  return (
    <button className="NO_PRINT" onClick={handleRemove}>
      <IoMdClose />
    </button>
  );
};

export default RemoveItemButton;
