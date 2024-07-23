import React from "react";
import SectionHeading from "./SectionHeading";
import { CustomerLinks } from "@/constants/DashboardLinks";
import SectionButtonLayout from "./SectionButtonLayout";

const CustomersSection = () => {
  return (
    <section className="my-8 text-center">
      <SectionHeading name="Customers" />

      {CustomerLinks.map((link) => (
        <SectionButtonLayout key={link.href} {...link} />
      ))}
    </section>
  );
};

export default CustomersSection;
