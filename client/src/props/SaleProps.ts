import CustomerProps from "./CustomerProps";

export interface AddSalesItemProps {
  _id: string;
  details: string;
  quantity: number;
  builtyNo: string;
  date: string;
}

export interface SaleMonthProps {
  _id: string;
  monthName: string;
}

export interface MonthlyStatItemProps {
  details: string;
  quantity: number;
}

export interface CustomerSalesProps {
  date: string;
  items: SaleItemProps[];
}

export interface SaleItemProps extends AddSalesItemProps {
  month: SaleMonthProps;
  customer?: CustomerProps;
  createdAt?: Date;
  updatedAt?: Date;
}
