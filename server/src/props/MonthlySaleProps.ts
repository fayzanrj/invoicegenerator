import { SaleProps } from "./SalesProps";

export interface MonthlySaleProps {
  _id: string;
  monthName: string;
  sales: SaleProps[] | string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
