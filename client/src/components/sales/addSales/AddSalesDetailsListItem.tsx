import AllProducts from "@/constants/AllProducts";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import DateInput from "../../shared/DateInput";
import { AddSalesItemProps } from "@/props/SaleProps";
import DetailsDataList from "@/components/shared/DetailsDataList";

// Props
interface AddSalesDetailsListProps {
  index: number;
  item: AddSalesItemProps;
  updateItem: (index: number, updatedItem: AddSalesItemProps) => void;
  removeItem: (index: number) => void;
}

const AddSalesDetailsList: React.FC<AddSalesDetailsListProps> = ({
  index,
  item,
  updateItem,
  removeItem,
}) => {
  // State to manage input fields
  const [fields, setFields] = useState({ ...item });

  // Handler for input change for quantity, details and  builtyNo change
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: type === "number" ? Number(value) || 0 : value,
    }));
  }, []);

  // Handler for date change
  const handleDateChange = useCallback(
    (newDate: string) =>
      setFields((prevFields) => ({ ...prevFields, date: newDate })),
    []
  );

  // Effect to update the parent componen
  useEffect(() => {
    updateItem(index, { ...fields });
  }, [fields, index]);

  return (
    <div className="flex items-center gap-2 w-full my-2">
      {/* REMOVE ITEM BUTTON */}
      <button onClick={() => removeItem(index)}>
        <IoMdClose />
      </button>

      {/* BUILTY NUMBER INPUT */}
      <input
        type="text"
        name="builtyNo"
        aria-label="Builty Number"
        onChange={handleChange}
        value={fields.builtyNo}
        className="text-center h-12 w-24 border rounded-lg p-1 font-sans"
      />

      {/* QUANTITY INPUT */}
      <input
        type="number"
        name="quantity"
        aria-label="Quantity"
        onChange={handleChange}
        value={fields.quantity.toString()}
        className="text-center h-12 w-20 border rounded-lg p-1 font-sans"
      />

      {/* ITEM DETAILS INPUT */}
      <input
        name="details"
        aria-label="Item Description"
        onChange={handleChange}
        value={fields.details}
        placeholder="...تفصیل لکھیں"
        className="w-full border h-12 rounded-lg p-2 text-right"
        list="allProducts"
      />
      {/* SUGGESTIONS */}
      <DetailsDataList />

      {/* DATE INPUT */}
      <DateInput
        variant="DETAIL"
        subVariant="ADD SALE"
        date={fields.date}
        setDate={handleDateChange}
      />
    </div>
  );
};

export default React.memo(AddSalesDetailsList);
