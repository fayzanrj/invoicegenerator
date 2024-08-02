import { InvoiceItemProps } from "@/props/InvoiceProps";
import React from "react";
import AddNewItem from "../shared/AddNewItem";
import InvoiceDetailsListItem from "./InvoiceDetailsListItem";
import { InvoiceTypeProps } from "@/props/InvoiceProps";

// Props
interface InvoiceDetailsListProps {
  items: InvoiceItemProps[];
  addItem: () => void;
  updateItem: (index: number, updatedItem: InvoiceItemProps) => void;
  removeItem: (index: number) => void;
  variant: "NEW_INVOICE" | "VIEW_INVOICE" | "EDIT_INVOICE" | "DRAFT";
  invoiceType : InvoiceTypeProps
}

const InvoiceDetailsList: React.FC<InvoiceDetailsListProps> = ({
  items,
  addItem,
  removeItem,
  updateItem,
  variant,
  invoiceType
}) => {
  return (
    <>
      {/* Detail headers */}
      <div className="w-full bg-black flex h-10 py-1.5">
        <p className="text-white w-[16%] text-center">بلٹی نمبر</p>
        <p className="text-white w-[16%] text-center">روپے</p>
        <p className="text-white w-[11.5%] text-center">ریٹ</p>
        <p className="text-white w-[11.5%] text-center">{invoiceType === "circle" ? "وزن" : "مقدار"}</p>
        <p className="text-white w-[30%] text-center">تفصیل</p>
      </div>

      {/* All details items */}
      {items.length > -1 &&
        items.map((item, index) => (
          <InvoiceDetailsListItem
            key={item._id}
            index={index}
            item={item}
            variant={variant}
            updateItem={updateItem}
            removeItem={removeItem}
          />
        ))}

      {/* add item button */}
      {(variant === "NEW_INVOICE" || variant === "EDIT_INVOICE") && (
        <AddNewItem handleClick={addItem} />
      )}
    </>
  );
};

export default InvoiceDetailsList;
