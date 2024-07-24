import AddSalesItemProps from "@/props/AddSalesItemProps";
import React from "react";
import AddSalesDetailsListItem from "./AddSalesDetailsListItem";
import AddNewItem from "../../shared/AddNewItem";

// Props
interface AddSalesDetailsListProps {
  items: AddSalesItemProps[];
  updateItem: (index: number, updatedItem: AddSalesItemProps) => void;
  addItem: () => void;
  removeItem: (index: number) => void;
}

// Headings for sales list
const AddSalesDetailsListHeader = () => (
  <div className="flex justify-center items-center h-12 gap-2 w-full bg-black text-white text-center">
    <p className="w-10 h-10"></p>
    <p className="w-36 p-1">بلٹی نمبر</p>
    <p className="w-32 p-1">مقدار</p>
    <p className="w-full text-right py-1 px-3">تفصیل</p>
    <p className="w-40">تاریخ</p>
  </div>
);

const AddSalesDetailsList: React.FC<AddSalesDetailsListProps> = ({
  addItem,
  items,
  removeItem,
  updateItem,
}) => {
  return (
    <div className="w-full my-4">
      {/* HEADER */}
      <AddSalesDetailsListHeader />

      {/* SALES ITEMS LIST */}
      {items.map((item, index) => (
        <AddSalesDetailsListItem
          key={item.id}
          index={index}
          item={item}
          updateItem={updateItem}
          removeItem={removeItem}
        />
      ))}

      {/* BUTTON TO ADD A NEW ITEM TO SALES ITEM LIST */}
      <AddNewItem handleClick={addItem} />
    </div>
  );
};

export default AddSalesDetailsList;
