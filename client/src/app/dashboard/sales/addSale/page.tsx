import AddSalesSection from "@/components/sales/addSales/AddSalesSection";
import BackButton from "@/components/shared/BackButton";
import PageHeading from "@/components/shared/PageHeading";
import RefreshPage from "@/components/shared/RefreshPage";
import ServerError from "@/components/shared/ServerError";
import fetchAllCustomers from "@/libs/fetch/FetchAllCustomers";

const AddSale = async () => {
  // Fetching all customers from database
  const customers = await fetchAllCustomers() ;

  // If customers are null
  if (!customers) return <ServerError label="Dashboard" href="/dashboard" />;

  return (
    <main className="p-4 relative min-h-dvh">
      {/* BACK NAVIGATION BUTTON */}
      <BackButton label="Sales" href="/dashboard/sales" />

      {/*  HEADING*/}
      <PageHeading name="ADD SALE" />

      {/* NEW SALE FORM */}
      <AddSalesSection customers={customers} />

      {/* COMPONENT TO REFRESH PAGE ON EVERY MOUNT */}
      <RefreshPage />
    </main>
  );
};

export default AddSale;
