import Link from "next/link";
import React from "react";
import ButtonLayout from "../shared/ButtonLayout";
import UrduFont from "@/constants/UrduFont";

// Props
interface SectionButtonLayoutProps {
  label: string;
  href: string;
}

const SectionButtonLayout: React.FC<SectionButtonLayoutProps> = ({
  href,
  label,
}) => {
  return (
    <Link href={href}>
      <ButtonLayout type="button" className={`${UrduFont} min-w-56`} isNav>
        {label}
      </ButtonLayout>
    </Link>
  );
};

export default SectionButtonLayout;
