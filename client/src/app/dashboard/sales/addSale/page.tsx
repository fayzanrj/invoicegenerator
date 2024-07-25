import AddSalesSection from "@/components/sales/addSales/AddSalesSection";
import PageLayout from "@/components/shared/PageLayout";
import ServerError from "@/components/shared/ServerError";
import fetchAllCustomers from "@/libs/fetch/FetchAllCustomers";

const AddSale = async () => {
  // Fetching all customers from database
  const customers = await fetchAllCustomers();

  // If customers are null
  if (!customers) return <ServerError label="Dashboard" href="/dashboard" />;

  return (
    <PageLayout pageName="ADD SALES">
      <AddSalesSection customers={customers} />
    </PageLayout>
  );
};

export default AddSale;
