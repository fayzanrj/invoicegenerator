import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
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
  // State to manage input fields
  const [fields, setFields] = useState<ItemProps>({ ...item });

  // Handler for builty number change
  const handleBuiltyChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newBuiltyNo: string = e.target.value;
    setFields((prevFields) => ({ ...prevFields, builtyNo: newBuiltyNo }));
  }, []);

  // Handler for rate change
  const handleRateChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newRate: number = Number.parseFloat(e.target.value) || 0;
    setFields((prevFields) => ({ ...prevFields, rate: newRate }));
  }, []);

  // Handler for quantity change
  const handleQuantityChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity: number = Number.parseFloat(e.target.value) || 0;
    setFields((prevFields) => ({ ...prevFields, quantity: newQuantity }));
  }, []);

  // Handler for details change
  const handleDetailsChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newDetails: string = e.target.value;
    setFields((prevFields) => ({ ...prevFields, details: newDetails }));
  }, []);

  // Handler for date change
  const handleDateChange = useCallback((newDate: string) => {
    setFields((prevFields) => ({ ...prevFields, date: newDate }));
  }, []);

  // Effect to calculate the total and update the parent component
  useEffect(() => {
    const newTotal: number = fields.quantity * fields.rate;
    if (newTotal !== fields.total) {
      setFields((prevFields) => ({ ...prevFields, total: newTotal }));
    }
    updateItem(index, { ...fields, total: newTotal });
  }, [fields, updateItem, index]);

  // Determining if the input fields should be read-only
  const isReadOnly = variant === "VIEW_INVOICE" || variant === "DRAFT";

  return (
    <div className="borderBottom border-stone-300 text-black min-h-12 my-2 align-middle">
      <div className="text-center w-[29%] inline-block align-middle font-sans">
        <div className="flex gap-1">
          {/* DELETE INVOICE BUTTON */}
          {(variant === "NEW_INVOICE" || variant === "EDIT_INVOICE") && (
            <button className="NO_PRINT" onClick={() => removeItem(index)}>
              <IoMdClose />
            </button>
          )}

          {/* Builty number input field */}
          <input
            type="text"
            readOnly={isReadOnly}
            aria-label="builtyNo"
            onChange={handleBuiltyChange}
            value={fields.builtyNo}
            className="text-center w-full min-h-12 border h-full align-middle rounded-lg font-sans inputBorder outline-none"
          />

          {/* Total input field */}
          <input
            value={fields.total}
            readOnly
            className="text-center w-full min-h-12 border h-full align-middle rounded-lg font-sans inputBorder outline-none"
          />
        </div>
      </div>

      {/* Rate input field */}
      <input
        type="number"
        readOnly={isReadOnly}
        aria-label="rate"
        value={fields.rate.toString()}
        onChange={handleRateChange}
        className={`w-[10%] border mx-1 min-h-12 rounded-lg align-middle font-sans h-full font-lg text-center inputBorder  ${
          isReadOnly ? "outline-none" : ""
        }`}
      />

      {/* Quantity input field */}
      <input
        type="number"
        aria-label="quantity"
        readOnly={isReadOnly}
        value={fields.quantity.toString()}
        onChange={handleQuantityChange}
        className={`text-center w-[10%] min-h-12 border h-full align-middle mr-1 rounded-lg font-sans inputBorder ${
          isReadOnly ? "outline-none" : ""
        }`}
      />

      {/* Details input field */}
      <div className="inline-block w-[48%] align-middle">
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

          {/* Date input field */}
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
