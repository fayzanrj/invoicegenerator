import Invoice from "@/components/invoice/Invoice";
import PageLayout from "@/components/shared/PageLayout";
import ServerError from "@/components/shared/ServerError";
import GetInvoiceNumber from "@/libs/GetInvoiceNumber";
import { Metadata } from "next";

// Page's metadata
export const metadata: Metadata = {
  title: "New invoice",
};

const CreateInvoice = async () => {
  // Fetching latest invoice number
  const invoiceNumber: number | undefined = await GetInvoiceNumber();

  // If there is an error while fecthing invoice number
  if (!invoiceNumber)
    return <ServerError />;

  return (
    <PageLayout
      pageName="NEW INVOICE"
      className="flex flex-col p-4 md:items-center"
    >
      {/* INVOICE DATA */}
      <Invoice variant="NEW_INVOICE" invoiceNumber={invoiceNumber} />
    </PageLayout>
  );
};

export default CreateInvoice;
