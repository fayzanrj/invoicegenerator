import Invoice from "@/components/invoice/Invoice";
import NotFound from "@/components/shared/NotFound";
import PageLayout from "@/components/shared/PageLayout";
import ServerError from "@/components/shared/ServerError";
import fetchInvoice from "@/libs/fetch/FetchInvoice";
import { Metadata } from "next";
import React from "react";

// Props
interface InvoiceDetailsProps {
  params: {
    invoiceNumber: string;
  };
}

// Function to generate dynamic page title
export async function generateMetadata({
  params,
}: InvoiceDetailsProps): Promise<Metadata> {
  return { title: `Invoice#${params.invoiceNumber}` };
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = async ({ params }) => {
  // Fetching a specific invoice
  const invoice = await fetchInvoice(params.invoiceNumber);
  // Href for errors
  const href = "/dashboard/invoices";

  // If error occurs while fetching invoice
  if (invoice === undefined)
    return <ServerError label="Invoices" href={href} />;

  // If invoice is not found || invoice is drafts (as it is not drafts page)
  if (invoice === null || invoice.isDraft)
    return <NotFound label="Invoices" href={href} />;

  return (
    <PageLayout
      pageName="INVOICE_DETAILS"
      invoiceNo={invoice.invoiceNumber}
      className="flex flex-col p-4 md:items-center"
    > 
      <Invoice variant="VIEW_INVOICE" {...invoice} />
    </PageLayout>
  );
};

export default InvoiceDetails;
