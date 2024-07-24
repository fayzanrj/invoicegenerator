import SaleProps from "./SaleProps";

interface MonthlySaleProps {
  _id: string;
  month: string;
  sales: SaleProps[];
  createdAt: Date;
  updatedAt: Date;
}

export default MonthlySaleProps;
