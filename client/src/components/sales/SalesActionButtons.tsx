import React, { useEffect, useState } from "react";
import ButtonLayout from "../shared/ButtonLayout";
import CustomerProps from "@/props/CustomerProps";
import handleApiError from "@/libs/HandleApiError";
import fetchCustomers from "@/libs/fetch/FetchCustomers";
import useHeaders from "@/hooks/useHeaders";
import AddSalesSection from "./addSales/AddSalesSection";
import ScreenLoader from "../shared/ScreenLoader";
import UrduFont from "@/constants/UrduFont";
import ScreenModal from "../shared/ScreenModal";
import Link from "next/link";

const SalesActionButtons = () => {
  // Statest
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Hook
  const headers = useHeaders();

  // Use effect to fetch customers when modal is opened
  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);

        if (isModalOpen) {
          const res = await fetchCustomers(1, headers.accessToken!);
          if (res?.customers) {
            setCustomers(res.customers);
          }
        }
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [isModalOpen, headers.accessToken]);

  // href for callback
  const href = window.location.href.split("?");
  return (
    <>
      {/* ADD SALE MODAL */}
      {isModalOpen && !isLoading && (
        <ScreenModal
          closeModal={() => setIsModalOpen(false)}
          showCancel
          isForm
          isAddSale
        >
          <AddSalesSection
            customers={customers}
            variant="MODAL"
            closeModal={() => setIsModalOpen(false)}
          />
        </ScreenModal>
      )}

      {/* LOADER */}
      {isLoading && <ScreenLoader />}

      <div className="text-right">
        <Link href={`/dashboard/customers?callbackUrl=${href[0]}`}>
          <ButtonLayout isNav className={UrduFont}>
            گاہکوں کی فہرست
          </ButtonLayout>
        </Link>
        <Link href={`/dashboard/sales/salesList?callbackUrl=${href[0]}`}>
          <ButtonLayout isNav className={UrduFont}>
            فروخت کی فہرست
          </ButtonLayout>
        </Link>
        <ButtonLayout onClick={() => setIsModalOpen(true)} className={UrduFont}>
          فروخت شامل کریں
        </ButtonLayout>
      </div>
    </>
  );
};

export default SalesActionButtons;
