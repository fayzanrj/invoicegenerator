import Invoice from "@/components/invoice/Invoice";
import BackButton from "@/components/shared/BackButton";
import PageHeading from "@/components/shared/PageHeading";
import ServerError from "@/components/shared/ServerError";
import fetchSalesForInvoice from "@/libs/fetch/FetchSalesForInvoice";
import GetInvoiceNumber from "@/libs/GetInvoiceNumber";
import { redirect } from "next/navigation";
import React from "react";

// Page props
interface InvoiceBySalesProps {
  searchParams: {
    customerId: string;
    monthId: string;
  };
}

const InvoiceBySales = async ({ searchParams }: InvoiceBySalesProps) => {
  const { customerId, monthId } = searchParams;

  if (
    !customerId ||
    !monthId ||
    customerId.length !== 24 ||
    monthId.length !== 24
  )
    redirect("/dashboard");

  const data = await fetchSalesForInvoice(customerId, monthId);

  if (!data) return <ServerError label="Dashboard" href="/dashboard" />;

  const invoiceNumber = await GetInvoiceNumber();

  const { customer, month, sales } = data;

  console.log({ sales });

  return (
    <main className="min-h-svh overflow-y-auto flex flex-col p-4 md:items-center pb-10">
      {/* BACK NAVIGATION BUTTON */}
      <BackButton label="Dashboard" href="/dashboard" />

      {/* HEADING*/}
      <PageHeading name="New Invoice" />

      {/* INVOICE DATA */}
      <Invoice
        variant="NEW_INVOICE"
        invoiceNumber={invoiceNumber}
        isDraft={false}
        buyerName={customer}
        list={sales}
      />
    </main>
  );
};

export default InvoiceBySales;
