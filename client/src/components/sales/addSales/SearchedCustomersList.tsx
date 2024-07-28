import UrduFont from "@/constants/UrduFont";
import CustomerProps from "@/props/CustomerProps";
import Loader from "../../shared/Loader";
import { SearchedCustomerTableHeading } from "@/components/shared/TableHeaders";

// Props
interface SearchedCustomersListProps {
  isLoading: boolean;
  customerResults: CustomerProps[];
  setCustomer: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }>
  >;
}

const SearchedCustomersList: React.FC<SearchedCustomersListProps> = ({
  isLoading,
  customerResults,
  setCustomer,
}) => {
  // Function to handle searched item click
  const handleClick = (id: string, name: string) => setCustomer({ id, name });

  // Displaying loader if data is loading
  if (isLoading) {
    return (
      <div className="overflow-y-auto bg-white h-80 max-h-[50svh] px-4 text-center relative">
        <Loader color="#000000" />
      </div>
    );
  }

  // Displaying message if no customers are found
  if (!isLoading && customerResults.length === 0) {
    return (
      <div className="overflow-y-auto bg-white h-80 max-h-[50svh] px-4 text-center relative">
        <p className={`${UrduFont} font-semibold py-4 text-center`}>
          کوئی گاہک نہیں ملا
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto bg-white h-80 max-h-[50svh] px-4 text-center relative">
      <table className="w-full border-collapse table-auto">
        <SearchedCustomerTableHeading />
        <tbody>
          {/* Rendering customer list items */}
          {customerResults.map((customer) => (
            <tr key={customer._id} className="cursor-pointer hover:bg-gray-100" onClick={() => handleClick(customer._id,customer.name)}>
              <td className="border-b py-3">{customer.name}</td>
              <td className="border-b py-3">
                گاہک <span className="font-sans">#{customer.customerNo}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchedCustomersList;
