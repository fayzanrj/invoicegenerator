import UrduFont from "@/constants/UrduFont";
import React from "react";

const NoSalesFound = () => {
  return (
    <section className="w-full">
      <h3
        className={`${UrduFont} font-sans font-semibold text-2xl py-4 text-center`}
      >
        کوئی فروخت نہیں ملی
      </h3>
    </section>
  );
};

export default NoSalesFound;
