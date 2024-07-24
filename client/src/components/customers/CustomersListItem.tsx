"use client";
import CustomerProps from "@/props/CustomerProps";
import React from "react";
import { useRouter } from "next/navigation";

// Props
interface CustomersListItemProps extends CustomerProps {
  index: number;
}

const CustomersListItem: React.FC<CustomersListItemProps> = ({
  createdAt,
  index,
  name,
  _id,
}) => {
  // Router for navigations
  const router = useRouter();

  return (
    <tr
      key={index}
      className="cursor-pointer w-full text-center text-sm md:text-[1rem] hover:bg-stone-200"
      onClick={() => router.push(`/dashboard/sales/customerSales/${_id}`)}
    >
      <td className="font-sans py-3">
        {new Date(createdAt).toLocaleDateString("ur-PK")}
      </td>
      <td className="font-semibold">{name}</td>
      <td className="font-sans text-lg">{index + 1}</td>
    </tr>
  );
};

export default CustomersListItem;
