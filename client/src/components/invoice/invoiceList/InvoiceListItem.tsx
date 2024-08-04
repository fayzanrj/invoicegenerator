"use client";
import renderInvoiceType from "@/libs/GetInvoiceType";
import InvoiceProps from "@/props/InvoiceProps";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

// Props
interface InvoiceListItemProps extends InvoiceProps {
  variant: "invoices" | "drafts";
}

// Defining valid invoice types
const validInvoiceTypes = ["waterset", "circle", "tapayi"] as const;

// Function to validate invoiceType
const isValidInvoiceType = (
  type: string | null
): type is (typeof validInvoiceTypes)[number] =>
  type !== null &&
  validInvoiceTypes.includes(type as (typeof validInvoiceTypes)[number]);

const InvoiceListItem: React.FC<InvoiceListItemProps> = ({
  invoiceNumber,
  total,
  buyerName,
  outstanding,
  date,
  variant,
  invoiceType,
}) => {
  // Hook
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramsInvoiceType = searchParams.get("invoiceType");

  // Validating invoicetype
  const validInvoiceType = isValidInvoiceType(paramsInvoiceType)
    ? paramsInvoiceType
    : null;

  // Function to handle click and move to invoice
  const handleRowClick = () => {
    const baseUrl = process.env.NEXT_PUBLIC_HOST;

    if (variant === "invoices") {
      const url = validInvoiceType
        ? `/dashboard/invoices/${invoiceNumber}?callbackUrl=${baseUrl}/dashboard/invoices?invoiceType=${validInvoiceType}`
        : `/dashboard/invoices/${invoiceNumber}?callbackUrl=${baseUrl}/dashboard/invoices`;

      router.push(url);
    } else {
      const url = `/dashboard/invoices/drafts/${invoiceNumber}?callbackUrl=${baseUrl}/dashboard/invoices/drafts`;
      router.push(url);
    }
  };

  return (
    <tr
      key={invoiceNumber}
      onClick={handleRowClick}
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
