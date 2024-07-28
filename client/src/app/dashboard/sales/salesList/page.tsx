
import SalesList from "@/components/sales/latestSales/SalesList";
import PageLayout from "@/components/shared/PageLayout";
import ServerError from "@/components/shared/ServerError";
import fetchSales from "@/libs/fetch/FetchSales";
import { authOptions } from "@/utilities/AuthOptions";
import { getServerSession } from "next-auth";

const SalesListPage = async () => {
  const session = await getServerSession(authOptions);

  // Fetching invoices that are not drafts
  const data = await fetchSales(1, session?.user.accessToken!);

  // If invoices are null
  if (!data || !data.sales) return <ServerError />;

  // Destructuring
  const { sales, isLastPage } = data;

  return (
    <PageLayout pageName="LATEST SALES">
      <SalesList sales={sales} isLastPage={isLastPage} />
    </PageLayout>
  );
};

export default SalesListPage;
