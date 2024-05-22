import Invoice from "@/components/invoice/Invoice";
import BackButton from "@/components/shared/BackButton";
import NotFound from "@/components/shared/NotFound";
import RefreshPage from "@/components/shared/RefreshPage";
import ServerError from "@/components/shared/ServerError";
import fetchInvoice from "@/libs/client/FetchInvoice";
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
  const invoice = await fetchInvoice(params.invoiceNumber);

  const href = "/dashboard/drafts";

  if (invoice === undefined) return <ServerError label="Drafts" href={href} />;

  if (invoice === null || !invoice.isDraft)
    return <NotFound label="Drafts" href={href} />;

  return (
    <main className="flex flex-col p-4 md:items-center">
      <BackButton label="Drafts" href="/dashboard/drafts" />

      <h1 className="ml-2 md:ml-4 my-2 font-bold text-4xl self-start NO_PRINT">
        EDIT DRAFT
      </h1>
      <Invoice variant="EDIT_INVOICE" {...invoice} />
      <RefreshPage />
    </main>
  );
};

export default EditInvoice;
