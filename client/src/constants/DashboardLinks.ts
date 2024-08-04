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
    label: "واٹرسیٹ بلز دیکھیں",
    href: `/dashboard/invoices?invoiceType=waterset&callbackUrl=${process.env.HOST}/dashboard`,
  },
  {
    label: "سرکل بلز دیکھیں",
    href: `/dashboard/invoices?invoiceType=circle&callbackUrl=${process.env.HOST}/dashboard`,
  },
  {
    label: "تپائی بلز دیکھیں",
    href: `/dashboard/invoices?invoiceType=tapayi&callbackUrl=${process.env.HOST}/dashboard`,
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
    label: "فروخت کی فہرست",
    href: `/dashboard/sales/salesList?callbackUrl=${process.env.HOST}/dashboard`,
  },
];
