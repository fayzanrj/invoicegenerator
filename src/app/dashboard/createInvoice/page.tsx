import Invoice from "@/components/invoice/Invoice";
import BackButton from "@/components/shared/BackButton";
import ServerError from "@/components/shared/ServerError";
import GetInvoiceNumber from "@/libs/client/GetInvoiceNumber";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New invoice",
};

const CreateInvoice = async () => {
  const invoiceNumber: number | undefined = await GetInvoiceNumber();

  if (!invoiceNumber)
    return <ServerError label="Dashboard" href="/dashboard" />;

  return (
    <div className="min-h-svh overflow-y-auto flex flex-col p-4 md:items-center pb-10">
      <BackButton label="Dashboard" href="/dashboard" />
      <h1 className="ml-2 md:ml-4 my-2 font-bold text-4xl self-start NO_PRINT">
        New Invoice
      </h1>
      <Invoice variant="NEW_INVOICE" invoiceNumber={invoiceNumber} />
    </div>
  );
};

export default CreateInvoice;
