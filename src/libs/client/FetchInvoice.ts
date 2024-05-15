import InvoiceProps from "@/props/InvoiceProps";
import { authOptions } from "@/utilities/AuthOptions";
import { getServerSession } from "next-auth";
import { number } from "zod";

const fetchInvoice = async (invoiceNumber: string) => {
  const invoice = Number.parseInt(invoiceNumber) || null;

  if (!invoice) {
    return null;
  }

  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(
      `${process.env.HOST}/api/invoice/getInvoice/${invoice}`,
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
