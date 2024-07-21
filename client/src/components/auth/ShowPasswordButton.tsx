import React from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

// Props
interface ShowPasswordButtonProps {
  onClick: () => void;
  inputType: "password" | "text";
}

const ShowPasswordButton: React.FC<ShowPasswordButtonProps> = ({
  onClick,
  inputType,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="absolute -translate-y-1/2 right-3 top-1/2"
    >
      {/* Toggling eye icon based on password visibility */}
      {inputType === "password" ? (
        <IoEye color={"#000000"} size={"1.2rem"} />
      ) : (
        <IoEyeOff color={"#000000"} size={"1.2rem"} />
      )}
    </button>
  );
};

export default ShowPasswordButton;
