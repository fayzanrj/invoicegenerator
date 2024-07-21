import InvoiceList from "@/components/invoice/InvoiceList";
import BackButton from "@/components/shared/BackButton";
import NotFound from "@/components/shared/NotFound";
import PageHeading from "@/components/shared/PageHeading";
import RefreshPage from "@/components/shared/RefreshPage";
import ServerError from "@/components/shared/ServerError";
import fetchAllInvoices from "@/libs/FetchAllInvoices";
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
    <main className="p-4">
      {/* BACK NAVIGATION BUTTON */}
      <BackButton label="Dashboard" href="/dashboard" />
      
      {/*  HEADING*/}
      <PageHeading name="INVOICES" />

      {/* LIST */}
      <InvoiceList variant="invoices" invoices={invoices} />

      {/* COMPONENT TO REFRESH PAGE ON EVERY MOUNT */}
      <RefreshPage />
    </main>
  );
};

export default Invoices;
