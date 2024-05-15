import Invoice from "@/components/invoice/Invoice";
import BackButton from "@/components/shared/BackButton";
import RefreshPage from "@/components/shared/RefreshPage";
import ServerError from "@/components/shared/ServerError";
import fetchInvoice from "@/libs/client/FetchInvoice";
import { Metadata } from "next";
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

  return (
    <main className="flex flex-col p-4 md:items-center">
      <BackButton label="Invoices" href="/dashboard/invoices" />
      {invoice ? (
        <Invoice variant="VIEW_INVOICE" {...invoice} />
      ) : (
        <ServerError />
      )}

      <RefreshPage />
    </main>
  );
};

export default InvoiceDetails;
