import React from "react";

// Props
interface SectionHeadingProps {
  name: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ name }) => {
  return <h3 className="text-xl my-2 font-semibold text-left">{name}</h3>;
};

export default SectionHeading;
