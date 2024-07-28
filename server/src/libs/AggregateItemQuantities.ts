import { SaleProps } from "../props/SalesProps";

// Function to aggregate item quantities
const aggregateItemQuantities = (
  items: SaleProps[]
): { aggregatedSales: { details: string; quantity: number }[] } & { totalSales: number } => {
  // Total number of sales
  let totalSales = 0;
  // Creating a map to aggregate quantities
  const itemMap: Record<string, number> = {};

  // Looping through each item and adding their quantity
  items.forEach(({ details, quantity }) => {
    if (itemMap[details]) {
      // If map already has the details of item as key
      itemMap[details] += quantity;
    } else {
      itemMap[details] = quantity; // Adding details of item as key in map
    }
    totalSales += quantity;
  });

  // Converting map to array of objects
  const aggregatedSales = Object.keys(itemMap).map((detail) => ({
    details: detail,
    quantity: itemMap[detail],
  }));

  return { aggregatedSales, totalSales };
};

export default aggregateItemQuantities;
