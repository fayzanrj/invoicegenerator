import Invoice from "@/components/invoice/Invoice";
import BackButton from "@/components/shared/BackButton";
import NotFound from "@/components/shared/NotFound";
import RefreshPage from "@/components/shared/RefreshPage";
import ServerError from "@/components/shared/ServerError";
import fetchInvoice from "@/libs/client/FetchInvoice";
import { Metadata } from "next";
import { redirect } from "next/dist/server/api-utils";
import React from "react";

export const metadata: Metadata = {
  title: "Invoice",
};

interface InvoiceDetailsProps {
  params: {
    invoiceNumber: string;
  };
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = async ({ params }) => {
  const invoice = await fetchInvoice(params.invoiceNumber);

  const href = "/dashboard/drafts";

  if (invoice === undefined) return <ServerError label="Drafts" href={href} />;

  if (invoice === null || !invoice.isDraft)
    return <NotFound label="Drafts" href={href} />;

  return (
    <main className="flex flex-col p-4 md:items-center">
      <BackButton label="Drafts" href={href} />
      <h1 className="ml-2 md:ml-4 my-2 font-bold text-4xl self-start">
        Invoice#{invoice.invoiceNumber} <span className="text-xl">(Draft)</span>
      </h1>
      <Invoice variant="DRAFT" {...invoice} />
      <RefreshPage />
    </main>
  );
};

export default InvoiceDetails;
