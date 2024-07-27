import React from "react";
import ButtonLayout from "./ButtonLayout";
import UrduFont from "@/constants/UrduFont";

// Props
interface FetchMoreButtonProps {
  handleFetchMore: () => void;
  label : "بل" | "کسٹمر" | "فروخت"
}

const FetchMoreButton: React.FC<FetchMoreButtonProps> = ({
  handleFetchMore,
  label
}) => {
  return (
    <div className="text-center py-8">
      <ButtonLayout
        onClick={handleFetchMore}
        className={`${UrduFont} font-sans h-10 !mx-auto`}
      >
        {`مزید  ${label}  نکالیں`}
      </ButtonLayout>
    </div>
  );
};

export default FetchMoreButton;
