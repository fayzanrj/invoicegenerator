import CustomersAndSalesSection from "@/components/dashboard/CustomersAndSalesSection";
import CustomersSection from "@/components/dashboard/CustomersAndSalesSection";
import InvoicesSection from "@/components/dashboard/InvoicesSection";
import LogOutButton from "@/components/dashboard/LogOutButton";
import UsersSection from "@/components/dashboard/UsersSection";
import { authOptions } from "@/utilities/AuthOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

// Page's metadata
export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard = async () => {
  // Getting autheticated user data
  const data = await getServerSession(authOptions);

  return (
    <main className="p-4 md:p-10 h-svh w-full flex justify-center items-center relative">
      <div className=" w-full max-w-[30rem] ">
        {/* USER DATA AND LOG OUT BUTTON */}
        <section className="w-full flex justify-between pr-2 items-center">
          <h1 className="font-bold text-4xl">Dashboard</h1>
          <LogOutButton />
        </section>

        {/* GRETTING */}
        <h3 className="my-4 text-stone-500">Welcome {data?.user.name}</h3>

        {/* SECTIONS */}
        <InvoicesSection />
        <CustomersAndSalesSection/>
        <UsersSection />
      </div>
    </main>
  );
};

export default Dashboard;
