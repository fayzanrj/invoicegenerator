import React, { useState, useEffect, ChangeEvent, useMemo } from "react";
import { IoMdClose } from "react-icons/io";
import DateInput from "../shared/DateInput";
import ItemProps from "@/props/ItemProps";
import AllProducts from "@/constants/AllProducts";

// Props
interface DetailsListItemProps {
  index: number;
  item: ItemProps;
  updateItem: (index: number, updatedItem: ItemProps) => void;
  removeItem: (index: number) => void;
  variant: "NEW_INVOICE" | "VIEW_INVOICE" | "EDIT_INVOICE" | "DRAFT";
}

const DetailsListItem: React.FC<DetailsListItemProps> = ({
  index,
  item,
  updateItem,
  removeItem,
  variant,
}) => {
  const [fields, setFields] = useState<ItemProps>({ ...item });

  // Memoizing the updateItem function to prevent unnecessary re-renders
  const memoizedUpdateItem = useMemo(() => updateItem, []);

  // Function to change rate
  const handleRateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newRate: number = Number.parseFloat(e.target.value) || 0;
    setFields({ ...fields, rate: newRate });
  };

  // Function to change quantity
  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity: number = Number.parseFloat(e.target.value) || 0;
    setFields({ ...fields, quantity: newQuantity });
  };

  // Function to change details
  const handleDetailsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDetails: string = e.target.value;
    setFields({ ...fields, details: newDetails });
  };

  // Function to change date
  const handleDateChange = (newDate: string) => {
    setFields({ ...fields, date: newDate });
  };

  useEffect(() => {
    const newTotal: number = fields.quantity * fields.rate;
    if (newTotal !== fields.total) {
      setFields((prevFields) => ({ ...prevFields, total: newTotal }));
    }
    memoizedUpdateItem(index, { ...fields, total: newTotal });
  }, [fields, memoizedUpdateItem, index]);

  // Determining if the input fields should be read-only
  const isReadOnly = variant === "VIEW_INVOICE" || variant === "DRAFT";

  return (
    <div className="borderBottom border-stone-300 text-black min-h-12 my-2 align-middle">
      <div className="text-center w-1/6 inline-block align-middle font-sans">
        <div className="flex">
          {(variant === "NEW_INVOICE" || variant === "EDIT_INVOICE") && (
            <button className="NO_PRINT" onClick={() => removeItem(index)}>
              <IoMdClose />
            </button>
          )}
          <input
            value={fields.total}
            readOnly
            className="text-center w-full min-h-12 border h-full align-middle rounded-lg font-sans inputBorder outline-none"
          />
        </div>
      </div>

      {/* Rate */}
      <input
        type="number"
        readOnly={isReadOnly}
        aria-label="rate"
        value={fields.rate.toString()}
        onChange={handleRateChange}
        className={`w-[15.3%] border mr-1 min-h-12 rounded-lg align-middle font-sans h-full font-lg text-center inputBorder  ${
          isReadOnly ? "outline-none" : ""
        }`}
      />

      {/* Quantity */}
      <input
        type="number"
        aria-label="quantity"
        readOnly={isReadOnly}
        value={fields.quantity.toString()}
        onChange={handleQuantityChange}
        className={`text-center w-[15.3%] min-h-12 border h-full align-middle mx-1 rounded-lg font-sans inputBorder ${
          isReadOnly ? "outline-none" : ""
        }`}
      />

      {/* Details */}
      <div className="inline-block w-1/2 align-middle">
        <div className="flex items-center">
          <input
            value={fields.details}
            onChange={handleDetailsChange}
            readOnly={isReadOnly}
            placeholder="...تفصیل لکھیں"
            className={`w-full border rounded-lg text-right h-12 align-middle px-2 overflow-hidden relative placeholder:pt-2 mr-1 ${
              isReadOnly ? "outline-none" : ""
            }`}
            spellCheck={false}
            list="allProducts"
          />
          <datalist id="allProducts">
            {AllProducts.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </datalist>

          {/* Date input to have a dynamic date */}
          <DateInput
            variant="DETAIL"
            invoiceVariant={variant}
            date={fields.date}
            setDate={handleDateChange}
          />

          <p className="inline-block align-middle font-sans text-right min-w-[9%]">
            &#46;{index + 1}
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DetailsListItem);
