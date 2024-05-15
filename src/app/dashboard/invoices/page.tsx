import InvoiceList from "@/components/invoice/InvoiceList";
import BackButton from "@/components/shared/BackButton";
import RefreshPage from "@/components/shared/RefreshPage";
import ServerError from "@/components/shared/ServerError";
import fetchAllInvoices from "@/libs/client/FetchAllInvoices";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Invoices",
};

const Invoices = async () => {
  const invoices = await fetchAllInvoices();

  return (
    <main className="p-4">
      <BackButton label="Dashboard" href="/dashboard" />
      {invoices ? <InvoiceList invoices={invoices} /> : <ServerError />}
      <RefreshPage />
    </main>
  );
};

export default Invoices;
