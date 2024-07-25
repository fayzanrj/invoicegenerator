import Invoice from "@/components/invoice/Invoice";
import PageLayout from "@/components/shared/PageLayout";
import ServerError from "@/components/shared/ServerError";
import fetchSalesForInvoice from "@/libs/fetch/FetchSalesForInvoice";
import GetInvoiceNumber from "@/libs/GetInvoiceNumber";
import { redirect } from "next/navigation";

// Page props
interface InvoiceBySalesProps {
  searchParams: {
    customerId: string;
    monthId: string;
  };
}

const InvoiceBySales = async ({ searchParams }: InvoiceBySalesProps) => {
  const { customerId, monthId } = searchParams;

  if (
    !customerId ||
    !monthId ||
    customerId.length !== 24 ||
    monthId.length !== 24
  )
    redirect("/dashboard");

  const data = await fetchSalesForInvoice(customerId, monthId);

  if (!data) return <ServerError label="Dashboard" href="/dashboard" />;

  const invoiceNumber = await GetInvoiceNumber();

  const { customer, month, sales } = data;

  console.log({ sales });

  return (
    <PageLayout
      pageName="NEW INVOICE"
      className="flex flex-col p-4 md:items-center"
    >
      <Invoice
        variant="NEW_INVOICE"
        invoiceNumber={invoiceNumber}
        isDraft={false}
        buyerName={customer}
        list={sales}
      />
    </PageLayout>
  );
};

export default InvoiceBySales;
