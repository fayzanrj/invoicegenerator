import React from "react";
import ButtonLayout from "./ButtonLayout";

// Props
interface ClearButtonProps {
  onClick: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClick }) => {
  return (
    <ButtonLayout
      onClick={onClick}
      className="font-sans !text-black mx-3 !h-fit font-semibold"
      background="transparent"
    >
      Clear
    </ButtonLayout>
  );
};

export default ClearButton;
