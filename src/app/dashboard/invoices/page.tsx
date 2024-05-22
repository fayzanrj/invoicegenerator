import InvoiceList from "@/components/invoice/InvoiceList";
import BackButton from "@/components/shared/BackButton";
import NotFound from "@/components/shared/NotFound";
import RefreshPage from "@/components/shared/RefreshPage";
import ServerError from "@/components/shared/ServerError";
import fetchAllInvoices from "@/libs/client/FetchAllInvoices";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Invoices",
};

const Invoices = async () => {
  const invoices = await fetchAllInvoices("INVOICES");

  if (!invoices) return <ServerError label="Dashboard" href="/dashboard" />;

  return (
    <main className="p-4">
      <BackButton label="Dashboard" href="/dashboard" />
      <InvoiceList variant="invoices" invoices={invoices} />

      <RefreshPage />
    </main>
  );
};

export default Invoices;
