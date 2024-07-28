import SearchedCustomersList from "@/components/sales/addSales/SearchedCustomersList";
import BackButton from "@/components/shared/BackButton";
import ScreenModal from "@/components/shared/ScreenModal";
import UrduFont from "@/constants/UrduFont";
import useHeaders from "@/hooks/useHeaders";
import useSearchDebounce from "@/hooks/useSearchDebounce";
import CustomerProps from "@/props/CustomerProps";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdArrowBackIos } from "react-icons/md";

// Common props interface
interface CommonProps {
  setCustomer: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }>
  >;
  initialCustomers: CustomerProps[];
}

// Props for Modal variant
interface ModalProps extends CommonProps {
  addVariant: "MODAL";
  closeModal: () => void;
}

// Props for Page variant
interface PageProps extends CommonProps {
  addVariant: "PAGE";
}

// Union type for props
type SelectCustomerModalProps = ModalProps | PageProps;

// Creating the SelectCustomerModal component
const SelectCustomerModal: React.FC<SelectCustomerModalProps> = ({
  setCustomer,
  initialCustomers,
  addVariant,
  ...props // spread to capture additional props
}) => {
  // Using state to manage the search query
  const [searchQuery, setSearchQuery] = useState("");
  // Using state to store search results and loading state
  const [customerResults, setCustomerResults] =
    useState<CustomerProps[]>(initialCustomers);
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  const headers = useHeaders();
  const debouncedSearchQuery = useSearchDebounce(searchQuery, 500);

  // Using useEffect to fetch search results based on the query
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearchQuery) {
        setIsLoading(true);
        try {
          // API CALL
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/customers/searchCustomers?q=${debouncedSearchQuery}`,
            { headers }
          );

          setCustomerResults(response.data.customers);
        } catch (error) {
          console.error("Error fetching search results", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Setting customerResults to initial customers if query is empty
        setCustomerResults(initialCustomers);
        setIsLoading(false);
      }
    };

    // Calling the function to fetch search results
    fetchSearchResults();
  }, [debouncedSearchQuery, headers.accessToken, initialCustomers]);

  return (
    <ScreenModal isSimpleModal showCancel={false}>
      <div className="w-96 bg-white overflow-y-auto rounded-lg p-3">
        {addVariant === "PAGE" ? (
          <BackButton />
        ) : (
          <button
            onClick={
              addVariant === "MODAL"
                ? (props as ModalProps).closeModal
                : undefined
            }
          >
            <MdArrowBackIos />
          </button>
        )}

        {/* INPUT FIELD */}
        <div className="w-3/4 h-16 max-w-96 mx-auto my-4 relative text-right">
          <label className="text-right sr-only" htmlFor="customerSearch">
            گاہک کا نام تلاش کریں
          </label>
          <input
            id="customerSearch"
            className={`${UrduFont} w-full h-10 px-2 pr-9 border-2 my-4 border-gray-200 rounded-md text-right`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="گاہک کا نام تلاش کریں"
          />
          <IoIosSearch className="absolute right-1.5 top-6" size={"1.5rem"} />
        </div>

        <SearchedCustomersList
          isLoading={isLoading}
          customerResults={customerResults}
          setCustomer={setCustomer}
        />
      </div>
    </ScreenModal>
  );
};

export default SelectCustomerModal;
