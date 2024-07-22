import COLORS from "@/constants/Colors";
import React from "react";

// Base Props
interface ButtonLayoutBaseProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  background?:
    | "primary"
    | "danger"
    | "transparent"
    | "saveDraft"
    | "saveInvoice" | "editInvoice";
}

// Type Button props
interface ButtonTypeProps extends ButtonLayoutBaseProps {
  type?: "button";
  onClick: () => void;
}

// Type Submit props
interface SubmitTypeProps extends ButtonLayoutBaseProps {
  type: "submit";
  onClick?: never;
}

// Type Nav props
interface NavTypeProps extends ButtonLayoutBaseProps {
  type?: "button";
  isNav: boolean;
  onClick?: never;
}

// Button layout type
type ButtonLayoutProps = ButtonTypeProps | SubmitTypeProps | NavTypeProps;

const ButtonLayout: React.FC<ButtonLayoutProps> = ({
  children,
  onClick,
  className = "",
  background = "primary",
  type = "button",
  disabled = false,
  fullWidth = false,
}) => {
  // Function to get button background color
  const getButtonBgColor = () => {
    switch (background) {
      case "primary":
        return COLORS["primaryButton"];
      case "danger":
        return COLORS["dangerButton"];
      case "saveDraft":
        return COLORS["saveDraft"];
      case "saveInvoice":
        return COLORS["saveInvoice"];
      case "editInvoice":
        return COLORS["editInvoice"];
      case "transparent":
      default:
        return "";
    }
  };

  // Default styles
  const defaultStyles = `
    relative h-11 text-white rounded-lg m-1 disabled:opacity-50 NO_PRINT
    ${fullWidth ? "w-full" : "w-fit px-2"}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${defaultStyles} ${className}`}
      style={{
        backgroundColor: getButtonBgColor(),
      }}
    >
      {children}
    </button>
  );
};

export default ButtonLayout;
