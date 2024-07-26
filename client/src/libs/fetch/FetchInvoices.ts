import InvoiceProps from "@/props/InvoiceProps";
import { authOptions } from "@/utilities/AuthOptions";
import { getServerSession } from "next-auth";

// Function to fetch all invoice based on if they are drafts or simple invoices
const fetchInvoices = async (
  type: "invoices" | "drafts",
  page: number,
  accessToken: string
) => {
  try {
    const fetchType = type === "drafts" ? "drafts" : "saved";
    console.log({ page });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/invoices/getInvoices/${fetchType}?page=${page}`,
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

export default fetchInvoices;
