import UrduFont from "@/constants/UrduFont";
import React from "react";

// Props
interface SectionHeadingProps {
  name: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ name }) => {
  return <h3 className={`${UrduFont} text-xl my-4 font-bold text-right pr-6 `}>{name}</h3>;
};

export default SectionHeading;
