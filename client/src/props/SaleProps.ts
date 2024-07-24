import CustomerProps from "./CustomerProps";

interface SaleProps {
  item: string;
  quantity: number;
  builtyNo: string;
  date: string;
  month: string;
  customer?: CustomerProps;
  createdAt?: Date;
  updatedAt?: Date;
}

export default SaleProps;
