import { InvoiceLinks } from "@/constants/DashboardLinks";
import SectionButtonLayout from "./SectionButtonLayout";
import SectionHeading from "./SectionHeading";

const InvoicesSection = () => {
  return (
    <section className="my-8 text-center">
      {/* Section heading*/}
      <SectionHeading name="Invoices" />

      {InvoiceLinks.map((link) => (
        <SectionButtonLayout key={link.href} {...link} />
      ))}
    </section>
  );
};

export default InvoicesSection;
