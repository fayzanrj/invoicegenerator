import InvoiceProps from "@/props/InvoiceProps";
import { authOptions } from "@/utilities/AuthOptions";
import { getServerSession } from "next-auth";

// Function to fetch a specific invoice
const fetchInvoice = async (invoiceNumber: string) => {
  // Parsing
  const invoice = Number.parseInt(invoiceNumber) || null;

  // Checking is invoice number is valid
  if (!invoice) {
    return null;
  }

  // Getting session
  const session = await getServerSession(authOptions);
  try {
    // API CALL
    const response = await fetch(
      `${process.env.SERVER_URL}/api/v1/invoices/getInvoice/${invoice}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          accessToken: session?.user.accessToken || "",
        },
      }
    );
    const res = await response.json();

    return res.invoice as InvoiceProps;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export default fetchInvoice;
