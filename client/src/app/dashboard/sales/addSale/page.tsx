import AddSalesSection from "@/components/sales/addSales/AddSalesSection";
import PageLayout from "@/components/shared/PageLayout";
import ServerError from "@/components/shared/ServerError";
import fetchCustomers from "@/libs/fetch/FetchCustomers";
import CustomerProps from "@/props/CustomerProps";
import { authOptions } from "@/utilities/AuthOptions";
import { getServerSession } from "next-auth";

const AddSale = async () => {
  const session = await getServerSession(authOptions);

  // Fetching customers
  const data = await fetchCustomers(1, session?.user.accessToken!);

  // If customers are null
  if (!data || !data.customers) return <ServerError />;

  // Destructuring
  const { customers } = data;

  return (
    <PageLayout pageName="ADD SALES">
      <AddSalesSection customers={customers} />
    </PageLayout>
  );
};

export default AddSale;
