import InvoiceList from "@/components/invoice/InvoiceList";
import PageLayout from "@/components/shared/PageLayout";
import ServerError from "@/components/shared/ServerError";
import fetchAllInvoices from "@/libs/fetch/FetchAllInvoices";
import { Metadata } from "next";

// Page;'s metdata
export const metadata: Metadata = {
  title: "All Drafts",
};

const Drafts = async () => {
  // Fetching all draft invoices
  const invoices = await fetchAllInvoices("DRAFT");

  // If invoice are null
  if (!invoices) return <ServerError label="Dashboard" href="/dashboard" />;

  return (
    <PageLayout pageName="DRAFTS">
      <InvoiceList variant="drafts" invoices={invoices} />
    </PageLayout>
  );
};

export default Drafts;
