import ItemProps from "./ItemProps";

interface InvoiceProps {
  invoiceNumber: number;
  buyerName: string;
  date: string;
  list: ItemProps[];
  total: number;
  note?: string;
  outstanding?: number;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default InvoiceProps;