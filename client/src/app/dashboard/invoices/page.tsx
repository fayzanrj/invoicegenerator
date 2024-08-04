import InvoiceList from "@/components/invoice/invoiceList/InvoiceList";
import PageLayout from "@/components/shared/PageLayout";
import ServerError from "@/components/shared/ServerError";
import fetchInvoices from "@/libs/fetch/FetchInvoices";
import fetchInvoicesByType from "@/libs/fetch/FetchInvoicesByType";
import { InvoiceTypeProps } from "@/props/InvoiceProps";
import { authOptions } from "@/utilities/AuthOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

// Props interface
interface InvoicePageProps {
  searchParams: {
    invoiceType: InvoiceTypeProps;
  };
}

// Function to generate dynamic page metadata
export async function generateMetadata({
  searchParams,
}: InvoicePageProps): Promise<Metadata> {
  const { invoiceType } = searchParams;
  let title = "All Invoices";
  
  if (invoiceType === "circle" || invoiceType === "tapayi" || invoiceType === "waterset") {
    title = `${invoiceType.charAt(0).toUpperCase() + invoiceType.slice(1)} Invoices`;
  }

  return { title };
}

const Invoices = async ({ searchParams }: InvoicePageProps) => {
  // Fetching the user session
  const session = await getServerSession(authOptions);

  // Extracting the invoice type from search parameters
  const { invoiceType } = searchParams;

  // Initialize data and pageTitle variables
  let data;

  if (invoiceType === undefined) {
    // Fetching invoices that are not drafts
    data = await fetchInvoices("invoices", 1, session?.user.accessToken!);
  } else if (
    invoiceType === "circle" ||
    invoiceType === "tapayi" ||
    invoiceType === "waterset"
  ) {
    // Fetching invoices by type
    data = await fetchInvoicesByType(
      invoiceType,
      1,
      session?.user.accessToken!
    );
  } else {
    // Return error if the invoice type is invalid
    return <ServerError />;
  }


  // If data or invoices are null, return server error component
  if (!data || !data.invoices) return <ServerError />;

  // Destructuring invoices and isLastPage from the fetched data
  const { invoices, isLastPage } = data;
  
  return (
    <PageLayout pageName={"INVOICES"}>
      <InvoiceList
        variant="invoices"
        invoiceType={invoiceType}
        invoices={invoices}
        isLastPage={isLastPage}
      />
    </PageLayout>
  );
};

export default Invoices;
