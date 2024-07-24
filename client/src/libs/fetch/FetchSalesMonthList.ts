import {SaleMonthProps} from "@/props/SaleProps";
import { authOptions } from "@/utilities/AuthOptions";
import { getServerSession } from "next-auth";

// Function to fetch all sales months list
const fetchSalesMonthList = async () => {
  try {
    const session = await getServerSession(authOptions);
    const response = await fetch(
      `${process.env.SERVER_URL}/api/v1/sales/getMonthsList`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          accessToken: session?.user.accessToken || "",
        },
      }
    );

    const res = await response.json();
    return res.saleMonths as SaleMonthProps[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export default fetchSalesMonthList;
