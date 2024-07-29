import ButtonLayout from "@/components/shared/ButtonLayout";
import ScreenLoader from "@/components/shared/ScreenLoader";
import ScreenModal from "@/components/shared/ScreenModal";
import UrduFont from "@/constants/UrduFont";
import useHeaders from "@/hooks/useHeaders";
import fetchCustomers from "@/libs/fetch/FetchCustomers";
import handleApiError from "@/libs/HandleApiError";
import CustomerProps from "@/props/CustomerProps";
import { SaleItemProps } from "@/props/SaleProps";
import React, { useEffect, useState } from "react";
import AddSalesSection from "../addSales/AddSalesSection";

// Props
interface AddSalesButtonProps {
  handleAddSales: (items: SaleItemProps[]) => void;
}

const AddSalesButton: React.FC<AddSalesButtonProps> = ({handleAddSales}) => {
  // States
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
            handleAddSales={handleAddSales}

          />
        </ScreenModal>
      )}

      {/* LOADER */}
      {isLoading && <ScreenLoader />}

      <div className="text-right">
        <ButtonLayout onClick={() => setIsModalOpen(true)} className={UrduFont}>
          فروخت شامل کریں
        </ButtonLayout>
      </div>
    </>
  );
};

export default AddSalesButton;
