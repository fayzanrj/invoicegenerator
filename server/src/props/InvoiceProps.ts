
export interface InvoiceItemProps {
  id?: string;
  details: string;
  quantity: number;
  rate: number;
  total: number;
  date: string;
  builtyNo?: string
}

export interface InvoiceProps {
  invoiceNumber: number;
  buyerName: string;
  date: string;
  list: InvoiceItemProps[];
  total: number;
  note?: string;
  outstanding?: number;
  createdBy?: string;
  isDraft: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}