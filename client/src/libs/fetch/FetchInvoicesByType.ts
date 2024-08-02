import InvoiceProps, { InvoiceTypeProps } from "@/props/InvoiceProps";

// Function to fetch all invoices based on their type
const fetchInvoicesByType = async (
  type: InvoiceTypeProps,
  page: number,
  accessToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/invoices/getInvoicesByType/${type}?page=${page}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          accessToken: accessToken || "",
        },
      }
    );

    const res = await response.json();
    const invoices = res.invoices as InvoiceProps[];
    const isLastPage = res.isLastPage as boolean;
    return { invoices, isLastPage };
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export default fetchInvoicesByType;