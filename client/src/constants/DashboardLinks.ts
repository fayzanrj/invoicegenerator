import LinkProps from "@/props/LinkProps";

export const InvoiceLinks: LinkProps[] = [
  {
    label: "Create new invoice",
    href: "/dashboard/invoices/createInvoice",
  },
  {
    label: "View invoices",
    href: "/dashboard/invoices",
  },
  {
    label: "View drafts",
    href: "/dashboard/invoices/drafts",
  },
];

export const CustomerLinks: LinkProps[] = [
  {
    label: "Add Customer",
    href: "/dashboard/customers?addNew=true",
  },
  {
    label: "Customers List",
    href: "/dashboard/customers",
  },
];
