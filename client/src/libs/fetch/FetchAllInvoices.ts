import InvoiceProps from "@/props/InvoiceProps";
import { authOptions } from "@/utilities/AuthOptions";
import { getServerSession } from "next-auth";

// Function to fetch all invoice based on if they are drafts or simple invoices
const fetchAllInvoices = async (type: "INVOICES" | "DRAFT") => {
  try {
    const session = await getServerSession(authOptions);
    const fetchType = type === "DRAFT" ? "drafts" : "saved";
    const response = await fetch(
      `${process.env.SERVER_URL}/api/v1/invoices/getInvoices/${fetchType}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          accessToken: session?.user.accessToken || "",
        },
      }
    );

    const res = await response.json();
    return res.invoices as InvoiceProps[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export default fetchAllInvoices;
