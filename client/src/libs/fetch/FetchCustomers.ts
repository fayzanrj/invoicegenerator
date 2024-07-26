import CustomerProps from "@/props/CustomerProps";

// Function to fetch all customers
const fetchCustomers = async (page: number, accessToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/customers/getCustomers?page=${page}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          accessToken,
        },
      }
    );

    const res = await response.json();
    const customers = res.customers as CustomerProps[];
    const isLastPage = res.isLastPage as boolean;
    return { customers, isLastPage };
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export default fetchCustomers;
