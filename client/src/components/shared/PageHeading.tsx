import React from "react";

// Props
interface PageHeadingProps {
  name: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({ name }) => {
  return <h1 className="ml-2 md:ml-4 my-2 font-bold text-4xl NO_PRINT">{name}</h1>;
};

export default PageHeading;
