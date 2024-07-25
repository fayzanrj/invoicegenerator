import { SaleProps } from "../props/SalesProps";

export const sortItemsByDate = (items: SaleProps[]): SaleProps[] => {
  return items.sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split("-").map(Number);
    const [dayB, monthB, yearB] = b.date.split("-").map(Number);

    const dateA = new Date(yearA, monthA - 1, dayA); // Months are 0-based in JavaScript Date
    const dateB = new Date(yearB, monthB - 1, dayB);

    return dateA.getTime() - dateB.getTime(); // Sort ascending
  });
};

const aggregateItemsByDate = (
  items: SaleProps[]
): Record<string, SaleProps[]> => {
  return items.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, SaleProps[]>);
};

const sortAndAggregateItems = (
  items: SaleProps[]
): { date: string; items: SaleProps[] }[] => {
  const sortedItems = sortItemsByDate(items);
  const aggregatedItems = aggregateItemsByDate(sortedItems);
  return Object.entries(aggregatedItems).map(([date, items]) => ({
    date,
    items,
  }));
};

export default sortAndAggregateItems;
