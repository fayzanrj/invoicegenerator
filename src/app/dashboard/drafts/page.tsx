import InvoiceList from "@/components/invoice/InvoiceList";
import BackButton from "@/components/shared/BackButton";
import RefreshPage from "@/components/shared/RefreshPage";
import ServerError from "@/components/shared/ServerError";
import fetchAllInvoices from "@/libs/client/FetchAllInvoices";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Drafts",
};

const Drafts = async () => {
  const invoices = await fetchAllInvoices("DRAFT");

  if (!invoices) return <ServerError label="Dashboard" href="/dashboard" />;

  return (
    <main className="p-4">
      <BackButton label="Dashboard" href="/dashboard" />
      <h1 className="ml-2 md:ml-4 my-2 font-bold text-4xl">DRAFTS</h1>
      <InvoiceList variant="drafts" invoices={invoices} />
      <RefreshPage />
    </main>
  );
};

export default Drafts;
