import InvoiceProps from "@/props/InvoiceProps";

const validateInvoiceData = (data: InvoiceProps) => {
  // Checking if all required fields are present
  const { buyerName, date, list, total } = data;
  if (!buyerName || !date || !list || !total) {
    return false;
  }

  // Checking if list is valid
  if (!Array.isArray(list)) {
    return false;
  }

  // Checking if each item in the list is valid
  for (const item of list) {
    if (
      typeof item.id !== "string" ||
      typeof item.details !== "string" ||
      typeof item.quantity !== "number" ||
      typeof item.rate !== "number" ||
      typeof item.total !== "number"
    ) {
      return false;
    }
  }

  return true;
};

export default validateInvoiceData;
