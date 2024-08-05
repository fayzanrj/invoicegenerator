import DateInput from "@/components/shared/DateInput";
import DetailsDataList from "@/components/shared/DetailsDataList";
import { InvoiceItemProps, InvoiceTypeProps } from "@/props/InvoiceProps";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import InvoiceDetailsInput from "./InvoiceDetailsInput";
import RemoveItemButton from "./RemoveItemButton";

// Props
interface DetailsListItemProps {
  index: number;
  item: InvoiceItemProps;
  updateItem: (index: number, updatedItem: InvoiceItemProps) => void;
  removeItem: (index: number) => void;
  variant: "NEW_INVOICE" | "VIEW_INVOICE" | "EDIT_INVOICE" | "DRAFT";
  invoiceType: InvoiceTypeProps;
}

const DetailsListItem: React.FC<DetailsListItemProps> = ({
  index,
  item,
  updateItem,
  removeItem,
  variant,
  invoiceType,
}) => {
  // State to manage input fields
  const [fields, setFields] = useState<InvoiceItemProps>({ ...item });

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
  const handleQuantityChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newQuantity: number = Number.parseFloat(e.target.value) || 0;
      setFields((prevFields) => ({ ...prevFields, quantity: newQuantity }));
    },
    []
  );

  // Handler for details change
  const handleDetailsChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newDetails: string = e.target.value;
      setFields((prevFields) => ({ ...prevFields, details: newDetails }));
    },
    []
  );

  // Handler for date change
  const handleDateChange = useCallback((newDate: string) => {
    setFields((prevFields) => ({ ...prevFields, date: newDate }));
  }, []);

  // Effect to calculate tde total and update tde parent component
  useEffect(() => {
    const newTotal: number = fields.quantity * fields.rate;
    if (newTotal !== fields.total) {
      setFields((prevFields) => ({ ...prevFields, total: newTotal }));
    }
    updateItem(index, { ...fields, total: newTotal });
  }, [fields, updateItem, index]);

  // Determining if tde input fields should be read-only
  const isReadOnly = variant === "VIEW_INVOICE" || variant === "DRAFT";

  // Function to render remove button
  const renderRemoveButton = () => {
    return (
      (variant === "NEW_INVOICE" || variant === "EDIT_INVOICE") && (
        <RemoveItemButton handleRemove={() => removeItem(index)} />
      )
    );
  };

  return (
    <tr className="min-w-full text-center align-top">
      {invoiceType === "waterset" ? (
        <>
          {/* BUILTY NUMBER */}
          <td className="flex">
            {renderRemoveButton()}

            {/* Builty number input field */}
            <InvoiceDetailsInput
              id="builtyNo"
              onChange={handleBuiltyChange}
              value={fields.builtyNo || ""}
            />
          </td>

          {/* TOTAL FIELD IF BUILTY NUMBER IS VISIBLE */}
          <td>
            <InvoiceDetailsInput
              id="total"
              readOnly
              value={Math.round(fields.total)}
            />
          </td>
        </>
      ) : (
        <td className="flex">
          {renderRemoveButton()}

          {/* TOTAL FIELD IF BUILTY NUMBER IS NOT VISIBLE */}
          <InvoiceDetailsInput
            id="total"
            readOnly
            value={parseInt(fields.total.toFixed(2)).toString()}
          />
        </td>
      )}

      {/* RATE INPUT FIELD */}
      <td>
        <InvoiceDetailsInput
          id="rate"
          onChange={handleRateChange}
          readOnly={isReadOnly}
          value={fields.rate.toString()}
        />
      </td>

      {/* QUANTITY INPUT FIELD */}
      <td>
        <InvoiceDetailsInput
          id="quantity"
          onChange={handleQuantityChange}
          readOnly={isReadOnly}
          value={fields.quantity.toString()}
        />
      </td>

      {/* ITEM DETALS AND DATE */}
      <td colSpan={1}>
        <div className="flex items-center">
          <InvoiceDetailsInput
            id="details"
            value={fields.details}
            onChange={handleDetailsChange}
            readOnly={isReadOnly}
            placeHolder="...تفصیل لکھیں"
          />

          {/* SUGGESTIONS */}
          <DetailsDataList />

          {/* DATE INPUT FIELD */}
          <DateInput
            variant="DETAIL"
            subVariant={variant}
            date={fields.date}
            setDate={handleDateChange}
          />

          {/* ITEM INDEX */}
          <p className="inline-block font-sans text-right min-w-[9%]">
            &#46;{index + 1}
          </p>
        </div>
      </td>
    </tr>
  );
};

export default React.memo(DetailsListItem);
