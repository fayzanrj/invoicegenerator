import { InvoiceTypeProps } from "@/props/InvoiceProps";
import React from "react";

// Props
interface InvoiceDetailsListHeaderProps {
  invoiceType: InvoiceTypeProps;
}

const InvoiceDetailsListHeader: React.FC<InvoiceDetailsListHeaderProps> = ({
  invoiceType,
}) => {
  // Column widths based on invoice type
  const columnWidths = {
    builtyNo: invoiceType === "waterset" ? "w-[15%]" : "",
    rupees: invoiceType === "waterset" ? "w-[15%]" : "w-[20%]",
    rate: invoiceType === "waterset" ? "w-[11%]" : "w-[15.5%]",
    quantity: invoiceType === "waterset" ? "w-[11%]" : "w-[15.5%]",
    details: invoiceType === "waterset" ? "w-[48%]" : "w-[49%]",
  };

  return (
    <thead className="w-full bg-black h-10 py-1.5">
      <tr>
        {invoiceType === "waterset" && (
          <th className={`text-white ${columnWidths.builtyNo} text-center`}>
            بلٹی نمبر
          </th>
        )}
        <th className={`text-white ${columnWidths.rupees} text-center`}>روپے</th>
        <th className={`text-white ${columnWidths.rate} text-center`}>ریٹ</th>
        <th className={`text-white ${columnWidths.quantity} text-center`}>
          {invoiceType === "circle" ? "وزن" : "مقدار"}
        </th>
        <th className={`text-white ${columnWidths.details} text-center`}>
          تفصیل
        </th>
      </tr>
    </thead>
  );
};

export default InvoiceDetailsListHeader;
