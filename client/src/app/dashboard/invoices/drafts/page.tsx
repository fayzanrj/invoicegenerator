import InvoiceList from "@/components/invoice/invoiceList/InvoiceList";
import PageLayout from "@/components/shared/PageLayout";
import ServerError from "@/components/shared/ServerError";
import fetchInvoices from "@/libs/fetch/FetchInvoices";
import fetchAllInvoices from "@/libs/fetch/FetchInvoices";
import { authOptions } from "@/utilities/AuthOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

// Page;'s metdata
export const metadata: Metadata = {
  title: "All Drafts",
};

const Drafts = async () => {
  const session = await getServerSession(authOptions);

  // Fetching all draft invoices
  const data = await fetchInvoices("drafts", 1, session?.user.accessToken!);

  // If invoices are null
  if (!data || !data.invoices)
    return <ServerError label="Dashboard" href="/dashboard" />;

  // Destruturing
  const { invoices, isLastPage } = data;

  return (
    <PageLayout pageName="DRAFTS">
      <InvoiceList
        variant="drafts"
        invoices={invoices}
        isLastPage={isLastPage}
      />
    </PageLayout>
  );
};

export default Drafts;
