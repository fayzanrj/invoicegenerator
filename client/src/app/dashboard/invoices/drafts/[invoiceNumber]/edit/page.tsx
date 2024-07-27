import Invoice from "@/components/invoice/Invoice";
import NotFound from "@/components/shared/NotFound";
import PageLayout from "@/components/shared/PageLayout";
import ServerError from "@/components/shared/ServerError";
import fetchInvoice from "@/libs/fetch/FetchInvoice";
import { Metadata } from "next";
import React from "react";

// Props
interface EditInvoiceProps {
  params: {
    invoiceNumber: string;
  };
}

// Function to generate dynamic page title
export async function generateMetadata({
  params,
}: EditInvoiceProps): Promise<Metadata> {
  return { title: `Invoice#${params.invoiceNumber}(Draft)` };
}

const EditInvoice: React.FC<EditInvoiceProps> = async ({ params }) => {
  // Fetching a specific invoice
  const invoice = await fetchInvoice(params.invoiceNumber);

  // Href for errors
  const href = "/dashboard/invoices/drafts";

  // If error occurs while fetching invoice
  if (invoice === undefined) return <ServerError />;

  // If invoice is not found || invoice is not drafts (as it is drafts page)
  if (invoice === null || !invoice.isDraft)
    return <NotFound label="Drafts" href={href} />;

  return (
    <PageLayout
      pageName="EDIT INVOICE"
      className="flex flex-col p-4 md:items-center"
    >
      <Invoice variant="EDIT_INVOICE" {...invoice} />
    </PageLayout>
  );
};

export default EditInvoice;
