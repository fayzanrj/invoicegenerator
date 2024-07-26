import NotFound from "@/app/not-found";
import CustomerSaleStats from "@/components/sales/customerSales/CustomerSalesStats";
import NoSalesFound from "@/components/sales/NoSalesFound";
import PageLayout from "@/components/shared/PageLayout";
import ServerError from "@/components/shared/ServerError";
import fetchSalesMonthList from "@/libs/fetch/FetchSalesMonthList";

// Page Params
interface ParamsProps {
  params: {
    customerId: string;
  };
}

const CustomerSales = async ({ params }: ParamsProps) => {
  // Destructuring
  const { customerId } = params;

  // Validating params
  if (customerId.length !== 24) return <NotFound />;

  //   Fetching months
  const months = await fetchSalesMonthList();

  // If months are null
  if (!months) return <ServerError label="Dashboard" href="/dashboard" />;

  return (
    <PageLayout pageName="CUSTOMER SALES">
      {months.length > 0 ? (
        <CustomerSaleStats months={months} customerId={customerId} />
      ) : (
        <NoSalesFound />
      )}
    </PageLayout>
  );
};

export default CustomerSales;
