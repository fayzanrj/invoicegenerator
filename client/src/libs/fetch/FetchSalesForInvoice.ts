import InvoiceProps, { InvoiceItemProps } from "@/props/InvoiceProps";
import { SaleItemProps } from "@/props/SaleProps";
import { authOptions } from "@/utilities/AuthOptions";
import { getServerSession } from "next-auth";

// Function to fetch all invoice based on if they are drafts or simple invoices
const fetchSalesForInvoice = async (customerId: string, monthId: string) => {
  try {
    if (customerId.length !== 24 || monthId.length !== 24) return undefined;

    const session = await getServerSession(authOptions);
    const response = await fetch(
      `${process.env.SERVER_URL}/api/v1/sales/getMonthlySalesInvoiceData/${monthId}?customerId=${customerId}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          accessToken: session?.user.accessToken || "",
        },
      }
    );

    const res = await response.json();

    return {
      customer: res.customer as string,
      month: res.month as string,
      sales: res.sales as InvoiceItemProps[],
    };
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export default fetchSalesForInvoice;
