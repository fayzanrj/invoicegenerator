import { authOptions } from "@/utilities/AuthOptions";
import { getServerSession } from "next-auth";

// Function to get latest invoice number
const GetInvoiceNumber = async () => {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(
      `${process.env.SERVER_URL}/api/v1/invoices/getInvoiceNumber`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          accessToken: session?.user.accessToken || "",
        },
      }
    );
    const res = await response.json();

    return res.number || undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export default GetInvoiceNumber;
