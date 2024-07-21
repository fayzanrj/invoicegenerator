import Link from "next/link";
import React from "react";
import ButtonLayout from "../shared/ButtonLayout";

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
      <ButtonLayout type="button" className="min-w-56" isNav>
        {label}
      </ButtonLayout>
    </Link>
  );
};

export default SectionButtonLayout;
