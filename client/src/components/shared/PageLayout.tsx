import React from "react";
import BackButton from "./BackButton";
import RefreshPage from "./RefreshPage";

// Props
interface PageLayoutBaseProps {
  children: React.ReactNode;
  className?: string;
}

// Props
interface PageLayoutCommonProps extends PageLayoutBaseProps {
  pageName:
    | "CUSTOMERS"
    | "INVOICES"
    | "DRAFTS"
    | "NEW INVOICE"
    | "EDIT INVOICE"
    | "SALES"
    | "CUSTOMER SALES"
    | "ADD SALES";
}

// Props
interface PageLayoutInvoiceDetailsProps extends PageLayoutBaseProps {
  pageName: "INVOICE_DETAILS" | "DRAFT_DETAILS";
  invoiceNo: number;
}

type PageLayoutProps = PageLayoutInvoiceDetailsProps | PageLayoutCommonProps;

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  pageName,
  className = "p-4",
  ...props
}) => {
  const renderPageHeading = () => {
    switch (pageName) {
      case "INVOICE_DETAILS":
        return (
          <PageHeading
            name={`Invoice#${
              (props as PageLayoutInvoiceDetailsProps).invoiceNo
            }`}
          />
        );
      case "DRAFT_DETAILS":
        return (
          <PageHeading
            name={`Invoice#${
              (props as PageLayoutInvoiceDetailsProps).invoiceNo
            }(Draft)`}
          />
        );
      default:
        return <PageHeading name={pageName} />;
    }
  };

  return (
    <main className={className}>
      {/* BACK NAVIGATION BUTTON */}
      <BackButton />

      {/* HEADING */}
      {renderPageHeading()}

      {/* CHILDREN CONTENT */}
      {children}

      {/* COMPONENT TO REFRESH PAGE ON EVERY MOUNT */}
      <RefreshPage />
    </main>
  );
};

export default PageLayout;

// Props
interface PageHeadingProps {
  name: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({ name }) => {
  return (
    <h1 className="w-full text-left ml-2 md:ml-4 mt-2 mb-4 font-bold text-4xl NO_PRINT">
      {name}
    </h1>
  );
};
