import Invoice from "@/components/invoice/Invoice";
import BackButton from "@/components/shared/BackButton";
import NotFound from "@/components/shared/NotFound";
import PageHeading from "@/components/shared/PageHeading";
import RefreshPage from "@/components/shared/RefreshPage";
import ServerError from "@/components/shared/ServerError";
import fetchInvoice from "@/libs/FetchInvoice";
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
  const href = "/dashboard/drafts";

  // If error occurs while fetching invoice
  if (invoice === undefined) return <ServerError label="Drafts" href={href} />;

  // If invoice is not found || invoice is not drafts (as it is drafts page)
  if (invoice === null || !invoice.isDraft)
    return <NotFound label="Drafts" href={href} />;

  return (
    <main className="flex flex-col p-4 md:items-center">
      {/* BACK NAVIGATION BUTTON */}
      <BackButton label="Drafts" href={href} />

      {/*  HEADING*/}
      <PageHeading
        name={`Invoice#${invoice.invoiceNumber} <span className="text-xl">(Draft)</span>`}
      />

      {/* INVOICE DATA */}
      <Invoice variant="EDIT_INVOICE" {...invoice} />

      {/* COMPONENT TO REFRESH PAGE ON EVERY MOUNT */}
      <RefreshPage />
    </main>
  );
};

export default EditInvoice;
