import CustomersList from "@/components/customers/CustomersList";
import BackButton from "@/components/shared/BackButton";
import PageHeading from "@/components/shared/PageHeading";
import RefreshPage from "@/components/shared/RefreshPage";
import ServerError from "@/components/shared/ServerError";
import fetchAllCustomers from "@/libs/fetch/FetchAllCustomers";

const Customers = async () => {
  // Fetching all customers from database
  const customers = await fetchAllCustomers();

  // If customers are null
  if (!customers) return <ServerError label="Dashboard" href="/dashboard" />;

  return (
    <main className="p-4">
      {/* BACK NAVIGATION BUTTON */}
      <BackButton label="Dashboard" href="/dashboard" />

      {/*  HEADING*/}
      <PageHeading name="CUSTOMERS" />

      {/* CUSTOMERS LIST */}
      <CustomersList customers={customers} />

      {/* COMPONENT TO REFRESH PAGE ON EVERY MOUNT */}
      <RefreshPage />
    </main>
  );
};

export default Customers;
