import AddSalesItemProps from "@/props/AddSalesItemProps";

// Props
interface SalesDataProps {
  customer: string;
  items: AddSalesItemProps[];
}

// Helper function to check if a value is a non-empty string
const isNonEmptyString = (value: string) =>
  typeof value === "string" && value.trim() !== "";

// Validation function
const validateSalesData = (salesData: SalesDataProps) => {
  // Checking the main fields of the salesData object
  if (!isNonEmptyString(salesData.customer)) {
    return false;
  }

  if (!Array.isArray(salesData.items) || salesData.items.length === 0) {
    return false;
  }

  // Check each item in the items array
  for (let i = 0; i < salesData.items.length; i++) {
    const item = salesData.items[i];

    if (!isNonEmptyString(item.id)) {
      return false;
    }

    if (!isNonEmptyString(item.item)) {
      return false;
    }

    if (!isNonEmptyString(item.date)) {
      return false;
    }

    if (typeof item.quantity !== "number" || item.quantity <= 0) {
      return false;
    }
  }

  // If all validations pass, returning true
  return true;
};

export default validateSalesData;
