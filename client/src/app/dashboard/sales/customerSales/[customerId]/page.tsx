import NotFound from "@/app/not-found";
import CustomerSaleStats from "@/components/sales/customerSales/CustomerSalesStats";
import NoSalesFound from "@/components/sales/NoSalesFound";
import BackButton from "@/components/shared/BackButton";
import PageHeading from "@/components/shared/PageHeading";
import RefreshPage from "@/components/shared/RefreshPage";
import ServerError from "@/components/shared/ServerError";
import fetchSalesMonthList from "@/libs/fetch/FetchSalesMonthList";

// Page Params
interface ParamsProps {
  params: {
    customerId: string;
  };
}

const CustomerSales = async ({ params }: ParamsProps) => {
  const { customerId } = params;

  // Validating params
  if (customerId.length !== 24) return <NotFound />;

  //   Fetching months
  const months = await fetchSalesMonthList();

  // If months are null
  if (!months) return <ServerError label="Dashboard" href="/dashboard" />;

  return (
    <main className="p-4 relative min-h-dvh">
      {/* BACK NAVIGATION BUTTON */}
      <BackButton label="Customers" href="/dashboard/customers" />

      {/*  HEADING*/}
      <PageHeading name="CUSTOMER SALES" />

      {months.length > 0 ? (
        <CustomerSaleStats months={months} customerId={customerId} />
      ) : (
        <NoSalesFound />
      )}

      {/* COMPONENT TO REFRESH PAGE ON EVERY MOUNT */}
      <RefreshPage />
    </main>
  );
};

export default CustomerSales;
