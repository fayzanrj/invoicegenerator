import { SaleMonthProps } from "@/props/SaleProps";
import React from "react";
import SelectInput from "../shared/SelectInput";

// Props
interface MonthSelectionInputProps {
  months: SaleMonthProps[];
  handleSelection: (id: string) => void;
  selectedMonthId : string
}

const MonthSelectionInput: React.FC<MonthSelectionInputProps> = ({
  months,
  selectedMonthId,
  handleSelection,
}) => {
  return (
    <section>
      <SelectInput
        id="saleMonthInput"
        label="مہینہ"
        variant="MONTH"
        onChange={handleSelection}
        placeholder="Select a month"
        options={months}
        value={selectedMonthId}
        className="max-w-60 text-2xl border-none mx-auto text-center print"
      />
    </section>
  );
};

export default MonthSelectionInput;
