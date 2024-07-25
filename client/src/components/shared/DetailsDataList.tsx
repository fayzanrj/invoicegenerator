import AllProducts from "@/constants/AllProducts";
import React from "react";

const DetailsDataList = () => {
  return (
    <datalist id="allProducts">
      {AllProducts.map((product, index) => (
        <option key={index} value={product}>
          {product}
        </option>
      ))}
    </datalist>
  );
};

export default DetailsDataList;
