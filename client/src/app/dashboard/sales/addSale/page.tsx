import AddSalesSection from "@/components/sales/addSales/AddSalesSection";
import PageLayout from "@/components/shared/PageLayout";
import ServerError from "@/components/shared/ServerError";
import fetchCustomers from "@/libs/fetch/FetchCustomers";
import CustomerProps from "@/props/CustomerProps";
import { authOptions } from "@/utilities/AuthOptions";
import { getServerSession } from "next-auth";

const AddSale = async () => {
  // TODO : FIX
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_SERVER_URL
    }/api/v1/customers/getCustomers?page=${1}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        accessToken: session?.user.accessToken!,
      },
    }
  );

  const res = await response.json();
  const customers = res.customers as CustomerProps[];

  // If customers are null
  if (!customers) return <ServerError label="Dashboard" href="/dashboard" />;

  return (
    <PageLayout pageName="ADD SALES">
      <AddSalesSection customers={customers} />
    </PageLayout>
  );
};

export default AddSale;
