import { InvoiceTypeProps } from "@/props/InvoiceProps";

const renderInvoiceType = (type: InvoiceTypeProps) => {
    switch (type) {
      case "waterset":
        return "واٹرسیٹ بل";
      case "circle":
        return "سرکل بل";
      case "pathi":
        return "پٹھی بل";
      default:
        return "";
    }
  };

  export default renderInvoiceType