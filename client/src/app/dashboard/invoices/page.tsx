import InvoiceList from "@/components/invoice/invoiceList/InvoiceList";
import PageLayout from "@/components/shared/PageLayout";
import ServerError from "@/components/shared/ServerError";
import fetchInvoices from "@/libs/fetch/FetchInvoices";
import { authOptions } from "@/utilities/AuthOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

// Metata
export const metadata: Metadata = {
  title: "All Invoices",
};

const Invoices = async () => {
  const session = await getServerSession(authOptions);

  // Fetching invoices that are not drafts
  const data = await fetchInvoices("invoices", 1, session?.user.accessToken!);

  // If invoices are null
  if (!data || !data.invoices)
    return <ServerError/>;

  // Destructuring
  const { invoices, isLastPage } = data;
  return (
    <PageLayout pageName="INVOICES">
      <InvoiceList
        variant="invoices"
        invoices={invoices}
        isLastPage={isLastPage}
      />
    </PageLayout>
  );
};

export default Invoices;
