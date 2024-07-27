import CustomerProps from "@/props/CustomerProps";
import { SaleItemProps } from "@/props/SaleProps";

// Function to fetch all sales
const fetchSales = async (page: number, accessToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/sales/getSales?page=${page}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          accessToken,
        },
      }
    );

    const res = await response.json();
    const sales = res.sales as SaleItemProps[];
    const isLastPage = res.isLastPage as boolean;
    return { sales, isLastPage };
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export default fetchSales;
