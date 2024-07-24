import { Customer } from "./CustomerProps";
import { MonthlySaleProps } from "./MonthlySaleProps";

export interface SaleIncomingDataItemProps {
  id: string;
  details: string;
  date: string;
  quantity: number;
  builtyNo: string;
}
[];

export interface SalesIncomingDataProps {
  customer: string;
  items: SaleIncomingDataItemProps[];
}

export interface SaleProps {
  _id: string;
  details: string;
  quantity: number;
  builtyNo: string;
  date: string;
  month: MonthlySaleProps | string;
  customer: Customer | string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
