import BackButton from "@/components/shared/BackButton";
import PageHeading from "@/components/shared/PageHeading";
import RefreshPage from "@/components/shared/RefreshPage";
import React from "react";

const Sales = () => {
  return (
    <main className="p-4 relative min-h-dvh">
      {/* BACK NAVIGATION BUTTON */}
      <BackButton label="Dashboard" href="/dashboard" />

      {/*  HEADING*/}
      <PageHeading name="SALES" />

      {/* COMPONENT TO REFRESH PAGE ON EVERY MOUNT */}
      <RefreshPage />
    </main>
  );
};

export default Sales;
