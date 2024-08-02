import React from "react";
import ScreenModal from "../shared/ScreenModal";
import UrduFont from "@/constants/UrduFont";
import { InvoiceTypeProps } from "@/props/InvoiceProps";
import BackButton from "../shared/BackButton";
import { INVOICE_TYPES } from "@/constants/InvoiceTypes";
import ButtonLayout from "../shared/ButtonLayout";

// Props
interface InvoiceTypeModalProps {
  setInvoiceType: React.Dispatch<React.SetStateAction<InvoiceTypeProps | null>>;
}

const InvoiceTypeModal: React.FC<InvoiceTypeModalProps> = ({
  setInvoiceType,
}) => {
  return (
    <ScreenModal isSimpleModal closeModal={() => {}}>
      <div
        className={`${UrduFont} w-[95%] max-w-96 bg-white px-3 py-4 drop-shadow-xl shadow-lg rounded-lg`}
      >
        <BackButton />

        <h3 className="text-2xl font-semibold text-right">
          بل کی قسم منتخب کریں
        </h3>

        <div className="py-4">
          {INVOICE_TYPES.map((item) => (
            <ButtonLayout
              key={item.type}
              fullWidth
              onClick={() => setInvoiceType(item.type)}
              className="!text-2xl !h-16"
            >
              {item.label}
            </ButtonLayout>
          ))}
        </div>
      </div>
    </ScreenModal>
  );
};

export default InvoiceTypeModal;
