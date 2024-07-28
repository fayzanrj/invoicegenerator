import React from "react";
import BackButton from "./BackButton";
import RefreshPage from "./RefreshPage";
import UrduFont from "@/constants/UrduFont";

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
    | "ADD SALES"
    | "LATEST SALES";
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
          <PageHeading>
            {`بل نمبر `}
            <span className="font-sans">
              {(props as PageLayoutInvoiceDetailsProps).invoiceNo}
            </span>
          </PageHeading>
        );
      case "DRAFT_DETAILS":
        return (
          <PageHeading>
            {`بل نمبر `}
            <span className="font-sans">
              {(props as PageLayoutInvoiceDetailsProps).invoiceNo}
            </span>
            {` (غیر مکمل)`}
          </PageHeading>
        );
      case "CUSTOMERS":
        return <PageHeading>گاہک</PageHeading>;
      case "INVOICES":
        return <PageHeading>بل</PageHeading>;
      case "DRAFTS":
        return <PageHeading>غیر مکمل بل</PageHeading>;
      case "NEW INVOICE":
        return <PageHeading>نیا بل</PageHeading>;
      case "EDIT INVOICE":
        return <PageHeading>بل میں ترمیم کریں</PageHeading>;
      case "SALES":
        return <PageHeading>فروخت</PageHeading>;
      case "CUSTOMER SALES":
        return <PageHeading>گاہک کی فروخت</PageHeading>;
      case "ADD SALES":
        return <PageHeading>فروخت شامل کریں</PageHeading>;
      case "LATEST SALES": 
        return <PageHeading>فروخت کی فہرست</PageHeading>;
      default:
        return <PageHeading>{pageName}</PageHeading>;
    }
  };

  return (
    <main className={className}>
      <header className="flex justify-between items-center w-full mb-6">
        {/* BACK NAVIGATION BUTTON */}
        <BackButton />

        {/* HEADING */}
        {renderPageHeading()}
      </header>

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
  children: React.ReactNode;
}

const PageHeading: React.FC<PageHeadingProps> = ({ children }) => {
  return (
    <h1
      className={`${UrduFont} w-full text-right mr-2 md:mr-4 mt-2 mb-4 font-bold text-4xl NO_PRINT`}
    >
      {children}
    </h1>
  );
};
