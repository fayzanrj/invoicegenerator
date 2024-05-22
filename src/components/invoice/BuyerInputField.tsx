import React from "react";

// Props
interface BuyerInputFieldProps {
  buyer: string;
  setBuyer: React.Dispatch<React.SetStateAction<string>>;
  variant: "NEW_INVOICE" | "VIEW_INVOICE" | "EDIT_INVOICE" | "DRAFT";
}

const BuyerInputField: React.FC<BuyerInputFieldProps> = ({
  buyer,
  setBuyer,
  variant,
}) => {
  return (
    <div>
      <input
        id="buyerName"
        className={`min-w-80 p-1 text-right h-12 border-gray-200 mr-2 mt-.5 outline-none ${
          variant === "VIEW_INVOICE" || variant === "DRAFT"
            ? "border-0"
            : "border"
        }`}
        placeholder="خریدار کا نام"
        value={buyer}
        onChange={(e) => setBuyer(e.currentTarget.value)}
        readOnly={variant === "VIEW_INVOICE" || variant === "DRAFT"}
      />
      <label htmlFor="buyerName">&#58; خریدار</label>
    </div>
  );
};

export default BuyerInputField;
