import { InvoiceTypeProps } from "@/props/InvoiceProps";

const renderInvoiceType = (type: InvoiceTypeProps) => {
    switch (type) {
      case "waterset":
        return "واٹرسیٹ بل";
      case "circle":
        return "سرکل بل";
      case "tapayi":
        return "تپائی بل";
      default:
        return "";
    }
  };

  export default renderInvoiceType