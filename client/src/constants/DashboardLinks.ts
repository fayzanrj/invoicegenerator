import LinkProps from "@/props/LinkProps";

export const InvoiceLinks: LinkProps[] = [
  {
    label: "نیا بل بنائیں",
    href: "/dashboard/invoices/createInvoice",
  },
  {
    label: "بلز دیکھیں",
    href: "/dashboard/invoices",
  },
  {
    label: "غیر مکمل بل",
    href: "/dashboard/invoices/drafts",
  },
];

export const CustomersAndSalesLinks: LinkProps[] = [
  {
    label: "فروخت شامل کریں",
    href: "/dashboard/sales/addSale",
  },
  {
    label: "فروخت",
    href: "/dashboard/sales",
  },
  {
    label: "نیا گاہک شامل کریں",
    href: "/dashboard/customers?addNew=true",
  },
  {
    label: "گاہکوں کی فہرست",
    href: "/dashboard/customers",
  },
];
