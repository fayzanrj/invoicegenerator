import MonthlySaleStats from "@/components/sales/monthlySale/MonthlySaleStats";
import NoSalesFound from "@/components/sales/NoSalesFound";
import BackButton from "@/components/shared/BackButton";
import PageHeading from "@/components/shared/PageHeading";
import RefreshPage from "@/components/shared/RefreshPage";
import ServerError from "@/components/shared/ServerError";
import fetchSalesMonthList from "@/libs/fetch/FetchSalesMonthList";
import React from "react";

const Sales = async () => {
  // Fetching sales months list from database
  const months = await fetchSalesMonthList();

  // If months are null
  if (!months) return <ServerError label="Dashboard" href="/dashboard" />;

  return (
    <main className="p-4 relative min-h-dvh">
      {/* BACK NAVIGATION BUTTON */}
      <BackButton label="Dashboard" href="/dashboard" />

      {/*  HEADING*/}
      <PageHeading name="SALES" />

      {months.length > 0 ? (
        <MonthlySaleStats months={months} />
      ) : (
        <NoSalesFound />
      )}

      {/* COMPONENT TO REFRESH PAGE ON EVERY MOUNT */}
      <RefreshPage />
    </main>
  );
};

export default Sales;