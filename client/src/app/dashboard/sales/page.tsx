import SectionSwitcher from "@/components/sales/SectionSwitcher";
import PageLayout from "@/components/shared/PageLayout";
import ServerError from "@/components/shared/ServerError";
import fetchSalesMonthList from "@/libs/fetch/FetchSalesMonthList";

const Sales = async () => {
  // Fetching sales months list from database
  const months = await fetchSalesMonthList();

  // If months are null
  if (!months) return <ServerError label="Dashboard" href="/dashboard" />;

  return (
    <PageLayout pageName="SALES">
      <SectionSwitcher months={months} />
    </PageLayout>
  );
};

export default Sales;
