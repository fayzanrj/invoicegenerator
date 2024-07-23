import CustomerProps from "@/props/CustomerProps";
import { authOptions } from "@/utilities/AuthOptions";
import { getServerSession } from "next-auth";

// Function to fetch all customers
const fetchAllCustomers = async () => {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(
      `${process.env.SERVER_URL}/api/v1/customers/getAllCustomers`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          accessToken: session?.user.accessToken || "",
        },
      }
    );

    const res = await response.json();
    return res.customers as CustomerProps[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export default fetchAllCustomers;
