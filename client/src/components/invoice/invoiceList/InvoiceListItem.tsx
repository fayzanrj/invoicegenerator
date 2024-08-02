"use client";
import renderInvoiceType from "@/libs/GetInvoiceType";
import InvoiceProps from "@/props/InvoiceProps";
import { useRouter } from "next/navigation";
import React from "react";

interface InvoiceListItemProps extends InvoiceProps {
  variant: "invoices" | "drafts";
}

const InvoiceListItem: React.FC<InvoiceListItemProps> = ({
  invoiceNumber,
  total,
  buyerName,
  outstanding,
  date,
  variant,
  invoiceType
}) => {
  // Hook
  const router = useRouter();

  return (
    <tr
      key={invoiceNumber}
      onClick={() =>
        router.push(
          variant === "invoices"
            ? `/dashboard/invoices/${invoiceNumber}?callbackUrl=${process.env.NEXT_PUBLIC_HOST}/dashboard/invoices`
            : `/dashboard/invoices/drafts/${invoiceNumber}?callbackUrl=${process.env.NEXT_PUBLIC_HOST}/dashboard/invoices/drafts`
        )
      }
      className="cursor-pointer w-full text-center text-sm md:text-[1rem] hover:bg-stone-200"
    >
      <td>{renderInvoiceType(invoiceType)}</td>
      <td className="font-sans py-2">{total + (outstanding || 0)}</td>
      <td className="font-sans">{date}</td>
      <td>{buyerName}</td>
      <td className="font-sans">{invoiceNumber}</td>
    </tr>
  );
};

export default InvoiceListItem;
