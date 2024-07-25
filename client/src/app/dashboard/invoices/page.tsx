import InvoiceList from "@/components/invoice/InvoiceList";
import PageLayout from "@/components/shared/PageLayout";
import ServerError from "@/components/shared/ServerError";
import fetchAllInvoices from "@/libs/fetch/FetchAllInvoices";
import { Metadata } from "next";

// Metata
export const metadata: Metadata = {
  title: "All Invoices",
};

const Invoices = async () => {
  // Fetching invoices that are not drqfts
  const invoices = await fetchAllInvoices("INVOICES");

  // If invoices are null
  if (!invoices) return <ServerError label="Dashboard" href="/dashboard" />;

  return (
    <PageLayout pageName="INVOICES">
      <InvoiceList variant="invoices" invoices={invoices} />
    </PageLayout>
  );
};

export default Invoices;
