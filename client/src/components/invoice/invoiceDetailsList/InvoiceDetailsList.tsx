import { InvoiceItemProps } from "@/props/InvoiceProps";
import React from "react";
import InvoiceDetailsListItem from "./InvoiceDetailsListItem";
import { InvoiceTypeProps } from "@/props/InvoiceProps";
import InvoiceDetailsListHeader from "./InvoiceDetailsListHeader";
import AddNewItem from "@/components/shared/AddNewItem";

// Props
interface InvoiceDetailsListProps {
  items: InvoiceItemProps[];
  addItem: () => void;
  updateItem: (index: number, updatedItem: InvoiceItemProps) => void;
  removeItem: (index: number) => void;
  variant: "NEW_INVOICE" | "VIEW_INVOICE" | "EDIT_INVOICE" | "DRAFT";
  invoiceType: InvoiceTypeProps;
}

const InvoiceDetailsList: React.FC<InvoiceDetailsListProps> = ({
  items,
  addItem,
  removeItem,
  updateItem,
  variant,
  invoiceType,
}) => {
  return (
    <>
      <table className="w-full">
        {/* Detail headers */}
        <InvoiceDetailsListHeader invoiceType={invoiceType} />

        <tbody className="w-full">
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
                invoiceType={invoiceType}
              />
            ))}
        </tbody>
      </table>
      {/* add item button */}
      {(variant === "NEW_INVOICE" || variant === "EDIT_INVOICE") && (
        <AddNewItem handleClick={addItem} />
      )}
    </>
  );
};

export default InvoiceDetailsList;
