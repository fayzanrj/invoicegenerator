import { CustomersAndSalesLinks } from "@/constants/DashboardLinks";
import SectionButtonLayout from "./SectionButtonLayout";
import SectionHeading from "./SectionHeading";

const CustomersAndSalesSection = () => {
  return (
    <section className="my-8 text-center">
      <SectionHeading name="فروخت اور گاہک" />

      {CustomersAndSalesLinks.map((link) => (
        <SectionButtonLayout key={link.href} {...link} />
      ))}
    </section>
  );
};

export default CustomersAndSalesSection;
