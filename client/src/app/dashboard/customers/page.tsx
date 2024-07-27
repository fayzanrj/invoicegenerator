import CustomersList from "@/components/customers/CustomersList";
import PageLayout from "@/components/shared/PageLayout";
import ServerError from "@/components/shared/ServerError";
import fetchCustomers from "@/libs/fetch/FetchCustomers";
import { authOptions } from "@/utilities/AuthOptions";
import { getServerSession } from "next-auth";

const Customers = async () => {
  const session = await getServerSession(authOptions);

  // Fetching customers
  const data = await fetchCustomers(1, session?.user.accessToken!);

  // If customers are null
  if (!data || !data.customers) return <ServerError />;

  // Destructuring
  const { customers, isLastPage } = data;
  return (
    <PageLayout pageName="CUSTOMERS">
      <CustomersList customers={customers} isLastPage={isLastPage} />
    </PageLayout>
  );
};

export default Customers;
