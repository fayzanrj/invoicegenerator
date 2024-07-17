"use client";
import InvoiceProps from "@/props/InvoiceProps";
import { Noto_Nastaliq_Urdu } from "next/font/google";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SearchInputField from "./SearchInputField";

// Props
interface InvoiceListProps {
  invoices: InvoiceProps[];
  variant: "invoices" | "drafts";
}

// Type for search options
type searchForType = "invoiceNumber" | "date" | "buyer" | null;

// Font
const font = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "600"],
});

const InvoiceList: React.FC<InvoiceListProps> = ({ invoices, variant }) => {
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  const router = useRouter();

  // Function to search for an invoice
  const searchInvoice = (text: string, type: searchForType) => {
    if (text && type) {
      let filtered: InvoiceProps[] = [];
      const query = text.trim();

      // If search option is invoice number
      if (type === "invoiceNumber") {
        filtered = invoices.filter((invoice) =>
          invoice.invoiceNumber.toString().includes(query)
        );
      }

      // if search option is buyer
      if (type === "buyer") {
        filtered = invoices.filter((invoice) =>
          invoice.buyerName.toLowerCase().includes(query.toLowerCase())
        );
      }

      // if search option is date
      if (type === "date") {
        filtered = invoices.filter((invoice) => invoice.date === query);
      }

      setFilteredInvoices(filtered);
    } else {
      setFilteredInvoices(invoices);
    }
  };

  return (
    <main className="py-4 md:px-4">
      {/* Input field */}
      <SearchInputField searchInvoice={searchInvoice} />

      <div className={`${font.className} my-4 mt-10 w-full`}>
        <table className="w-full">
          {/* Table header */}
          <th className="py-3 bg-black text-white w-1/4">گرینڈ ٹوٹل</th>
          <th className="bg-black text-white w-1/4">تاریخ</th>
          <th className="bg-black text-white w-1/4">خریدار</th>
          <th className="bg-black text-white w-1/4">#بل</th>

          {/* Invoices list */}
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map((invoice) => (
              <tr
                key={invoice.invoiceNumber}
                onClick={() =>
                  router.push(`/dashboard/${variant}/${invoice.invoiceNumber}`)
                }
                className="cursor-pointer w-full text-center text-sm md:text-[1rem] hover:bg-stone-200"
              >
                <td className="font-sans py-2">
                  {invoice.total + (invoice.outstanding || 0)}
                </td>
                <td className="font-sans">{invoice.date}</td>
                <td>{invoice.buyerName}</td>
                <td className="font-sans">{invoice.invoiceNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="text-center py-10 text-xl font-sans font-semibold"
              >
                NO INVOICES FOUND
              </td>
            </tr>
          )}
        </table>
      </div>
    </main>
  );
};

export default InvoiceList;
