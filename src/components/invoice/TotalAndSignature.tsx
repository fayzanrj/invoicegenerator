import React from "react";
import AmountInputField from "./AmountInputField";

// Props
interface TotalAndSignatureProps {
  totalAmount: number;
  outstandingAmount: number;
  setOutStandingAmount: React.Dispatch<React.SetStateAction<number>>;
  variant: "NEW_INVOICE" | "VIEW_INVOICE" | "EDIT_INVOICE" | "DRAFT";
}

const TotalAndSignature: React.FC<TotalAndSignatureProps> = ({
  totalAmount,
  outstandingAmount,
  setOutStandingAmount,
  variant,
}) => {
  return (
    <div>
      <AmountInputField id="total" label="ٹوٹل" value={totalAmount} readOnly />

      <AmountInputField
        id="outstandingAmount"
        label="سابقہ"
        value={outstandingAmount}
        setValue={setOutStandingAmount}
        readOnly={variant === "VIEW_INVOICE" || variant === "DRAFT"}
      />

      <AmountInputField
        id="grandTotal"
        label="گرینڈ ٹوٹل"
        value={totalAmount + outstandingAmount}
        readOnly
      />

      {/* Signature */}
      <p className="mt-16">_____________ دستخط</p>
    </div>
  );
};

export default TotalAndSignature;
