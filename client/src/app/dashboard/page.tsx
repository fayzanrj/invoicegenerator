import CustomersAndSalesSection from "@/components/dashboard/CustomersAndSalesSection";
import CustomersSection from "@/components/dashboard/CustomersAndSalesSection";
import InvoicesSection from "@/components/dashboard/InvoicesSection";
import LogOutButton from "@/components/dashboard/LogOutButton";
import UsersSection from "@/components/dashboard/UsersSection";
import UrduFont from "@/constants/UrduFont";
import { authOptions } from "@/utilities/AuthOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

// صفحے کا میٹا ڈیٹا
export const metadata: Metadata = {
  title: "ڈیش بورڈ",
};

const Dashboard = async () => {
  // مصدقہ صارف کا ڈیٹا حاصل کرنا
  const data = await getServerSession(authOptions);

  return (
    <main className={` p-4 md:p-10 h-svh w-full flex justify-center relative`}>
      <div className=" w-full max-w-[30rem] ">
        {/* صارف کا ڈیٹا اور لاگ آؤٹ بٹن */}
        <section className="w-full flex justify-between pr-2 items-center">
          <LogOutButton />
          <h1 className={`${UrduFont} font-bold text-4xl`}>ڈیش بورڈ</h1>
        </section>

        {/* خوش آمدید */}
        <h3 className={`${UrduFont} my-4 text-stone-500 text-right`}>{data?.user.name} خوش آمدید</h3>

        {/* سیکشن */}
        <InvoicesSection />
        <CustomersAndSalesSection/>
        <UsersSection />
      </div>
    </main>
  );
};

export default Dashboard;
