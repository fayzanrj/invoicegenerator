import Invoice from "@/components/invoice/Invoice";
import BackButton from "@/components/shared/BackButton";
import PageHeading from "@/components/shared/PageHeading";
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

  // If there is an error efcthing invoice number
  if (!invoiceNumber)
    return <ServerError label="Dashboard" href="/dashboard" />;

  return (
    <main className="min-h-svh overflow-y-auto flex flex-col p-4 md:items-center pb-10">
      {/* BACK NAVIGATION BUTTON */}
      <BackButton label="Dashboard" href="/dashboard" />

      {/* HEADING*/}
      <PageHeading name="New Invoice" />

      {/* INVOICE DATA */}
      <Invoice variant="NEW_INVOICE" invoiceNumber={invoiceNumber} />
    </main>
  );
};

export default CreateInvoice;
