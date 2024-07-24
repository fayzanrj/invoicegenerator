"use client";
import { IoMdRefresh } from "react-icons/io";
import ButtonLayout from "./ButtonLayout";

// Props
interface RefreshButtonProps {
  handleClick: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ handleClick }) => {
  return (
    <ButtonLayout onClick={handleClick} background="transparent" className="mx-3">
      <IoMdRefresh size={"1.5rem"} className=" inline-block text-black" />
    </ButtonLayout>
  );
};

export default RefreshButton;
