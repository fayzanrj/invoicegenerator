import CustomersList from "@/components/customers/CustomersList";
import PageLayout from "@/components/shared/PageLayout";
import ServerError from "@/components/shared/ServerError";
import fetchAllCustomers from "@/libs/fetch/FetchAllCustomers";

const Customers = async () => {
  // Fetching all customers from database
  const customers = await fetchAllCustomers();

  // If customers are null
  if (!customers) return <ServerError label="Dashboard" href="/dashboard" />;

  return (
    <PageLayout pageName="CUSTOMERS">
      <CustomersList customers={customers} />
    </PageLayout>
  );
};

export default Customers;
