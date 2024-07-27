import LinkProps from "@/props/LinkProps";

export const InvoiceLinks: LinkProps[] = [
  {
    label: "نیا بل بنائیں",
    href: `/dashboard/invoices/createInvoice?callbackUrl=${process.env.HOST}/dashboard`,
  },
  {
    label: "بلز دیکھیں",
    href: `/dashboard/invoices?callbackUrl=${process.env.HOST}/dashboard`,
  },
  {
    label: "غیر مکمل بل",
    href: `/dashboard/invoices/drafts?callbackUrl=${process.env.HOST}/dashboard`,
  },
];

export const CustomersAndSalesLinks: LinkProps[] = [
  {
    label: "فروخت شامل کریں",
    href: `/dashboard/sales/addSale?callbackUrl=${process.env.HOST}/dashboard`,
  },
  {
    label: "فروخت",
    href: `/dashboard/sales?callbackUrl=${process.env.HOST}/dashboard`,
  },
  {
    label: "نیا گاہک شامل کریں",
    href: `/dashboard/customers?addNew=true&callbackUrl=${process.env.HOST}/dashboard`,
  },
  {
    label: "گاہکوں کی فہرست",
    href: `/dashboard/customers?callbackUrl=${process.env.HOST}/dashboard`,
  },
  {
    label: "تازہ ترین فروخت",
    href: `/dashboard/sales/latestSales?callbackUrl=${process.env.HOST}/dashboard`,
  },
];
