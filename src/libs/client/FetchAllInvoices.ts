import InvoiceProps from "@/props/InvoiceProps";
import { authOptions } from "@/utilities/AuthOptions";
import { getServerSession } from "next-auth";

const fetchAllInvoices = async (type: "INVOICES" | "DRAFT") => {
  const session = await getServerSession(authOptions);
  try {
    const fetchType = type === "DRAFT" ? "getDrafts" : "getInvoices";
    const response = await fetch(
      `${process.env.HOST}/api/invoice/${fetchType}`,
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
