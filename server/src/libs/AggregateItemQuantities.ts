import { SaleProps } from "../props/SalesProps";

// Function to aggregate item quantities
const aggregateItemQuantities = (
  items: SaleProps[]
): { details: string; quantity: number }[] => {
  // Creating a map to aggregate quantities
  const itemMap: Record<string, number> = {};

  // Looping through each item and adding their quantity
  items.forEach(({ details, quantity }) => {
    if (itemMap[details]) { // If map already has the details of item as key
      itemMap[details] += quantity;
    } else {
      itemMap[details] = quantity; // Adding details of item as key in map 
    }
  });

  // Converting map to array of objects
  const result = Object.keys(itemMap).map((detail) => ({
    details: detail,
    quantity: itemMap[detail],
  }));

  return result;
};

export default aggregateItemQuantities;
