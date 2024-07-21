import InvoiceList from "@/components/invoice/InvoiceList";
import BackButton from "@/components/shared/BackButton";
import PageHeading from "@/components/shared/PageHeading";
import RefreshPage from "@/components/shared/RefreshPage";
import ServerError from "@/components/shared/ServerError";
import fetchAllInvoices from "@/libs/FetchAllInvoices";
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
    <main className="p-4">
      {/* BACK NAVIGATION BUTTON */}
      <BackButton label="Dashboard" href="/dashboard" />

      {/*  HEADING*/}
      <PageHeading name="DRAFTS" />

      {/* LIST */}
      <InvoiceList variant="drafts" invoices={invoices} />

      {/* COMPONENT TO REFRESH PAGE ON EVERY MOUNT */}
      <RefreshPage />
    </main>
  );
};

export default Drafts;
