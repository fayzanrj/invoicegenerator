"use client";
import UrduFont from "@/constants/UrduFont";
import { SaleMonthProps } from "@/props/SaleProps";
import React, { useState } from "react";
import ButtonLayout from "../shared/ButtonLayout";
import MonthlySaleStats from "./monthlySale/MonthlySaleStats";
import NoSalesFound from "./NoSalesFound";
import SalesActionButtons from "./SalesActionButtons";
import SalesByDate from "./salesByDate/SalesByDate";

// Props
interface SectionSwitcherProps {
  months: SaleMonthProps[];
}

// Section type
type SectionType = "MONTH" | "DATE";

const SectionSwitcher: React.FC<SectionSwitcherProps> = ({ months }) => {
  // State
  const [selectedSection, setSelectedSection] = useState<SectionType>("DATE");

  // Function to render button
  const renderButton = (section: SectionType, label: string) => (
    <ButtonLayout
      onClick={() => setSelectedSection(section)}
      className={`!w-1/3 !text-black duration-100 font-bold text-xl ${
        selectedSection === section
          ? "border-b-2 border-black !rounded-none"
          : "scale-75"
      }`}
      background="transparent"
    >
      {label}
    </ButtonLayout>
  );

  return (
    <>
      <SalesActionButtons />
      
      {/* SWITCH BUTTONS */}
      <section className={`${UrduFont} w-full text-center my-4 NO_PRINT`}>
        {renderButton("MONTH", "ماہانہ فروخت")}
        {renderButton("DATE", "تاریخ کے حساب سے فروخت")}
      </section>


      {!months || months.length <= 0 ? (
        <NoSalesFound />
      ) : selectedSection === "MONTH" ? (
        <MonthlySaleStats months={months} />
      ) : (
        <SalesByDate />
      )}
    </>
  );
};

export default SectionSwitcher;
