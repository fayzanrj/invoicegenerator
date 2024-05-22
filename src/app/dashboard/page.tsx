import UserActionButtons from "@/components/auth/UserActionButtons";
import LogOutButton from "@/components/shared/LogOutButton";
import { authOptions } from "@/utilities/AuthOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard = async () => {
  const data = await getServerSession(authOptions);
  return (
    <main className="p-4 md:p-10 h-svh w-full flex justify-center items-center relative">
      <div className=" w-full max-w-[30rem] ">
        <div className="w-full flex justify-between pr-2 items-center">
          <h1 className="font-bold text-4xl">Dashboard</h1>
          <LogOutButton />
        </div>
        <h3 className="my-4 text-stone-500">Welcome {data?.user.name}</h3>

        <section className="my-8 text-center">
          <Link href="/dashboard/createInvoice">
            <button className="my-1 py-2.5 w-full max-w-56 bg-black text-white rounded-md mx-2">
              Create new invoice
            </button>
          </Link>
          <Link href={"/dashboard/invoices"}>
            <button className="my-1 py-2.5 w-full max-w-56 bg-black text-white rounded-md mx-2">
              View invoices
            </button>
          </Link>
          <Link href={"/dashboard/drafts"}>
            <button className="my-1 py-2.5 w-full max-w-56 bg-black text-white rounded-md mx-2">
              View drafts
            </button>
          </Link>
        </section>

        <UserActionButtons />
      </div>
    </main>
  );
};

export default Dashboard;
