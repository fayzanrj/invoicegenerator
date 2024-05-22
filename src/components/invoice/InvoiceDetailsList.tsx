import ItemProps from "@/props/ItemProps";
import React from "react";
import DetailsListItem from "./DetailsListItem";
import AddItem from "./AddItem";

// Props
interface InvoiceDetailsListProps {
  items: ItemProps[];
  addItem: () => void;
  updateItem: (index: number, updatedItem: ItemProps) => void;
  removeItem: (index: number) => void;
  variant: "NEW_INVOICE" | "VIEW_INVOICE" | "EDIT_INVOICE" | "DRAFT";
}

const InvoiceDetailsList: React.FC<InvoiceDetailsListProps> = ({
  items,
  addItem,
  removeItem,
  updateItem,
  variant,
}) => {
  return (
    <>
      {/* Detail headers */}
      <div className="w-full bg-black flex h-10 py-1.5">
        <p className="text-white w-1/6 text-center">روپے</p>
        <p className="text-white w-1/6 text-center">مقدار</p>
        <p className="text-white w-1/6 text-center">نرخ</p>
        <p className="text-white w-3/6 text-center">تفصیل</p>
      </div>

      {/* All details items */}
      {items.length > -1 &&
        items.map((item, index) => (
          <DetailsListItem
            key={item.total + index + item.date}
            index={index}
            item={item}
            variant={variant}
            updateItem={updateItem}
            removeItem={removeItem}
          />
        ))}

      {/* add item button */}
      {(variant === "NEW_INVOICE" || variant === "EDIT_INVOICE") && (
        <AddItem handleClick={addItem} />
      )}
    </>
  );
};

export default InvoiceDetailsList;
