interface SalesDataProps {
  customer: string;
  items: {
    id: string;
    item: string;
    date: string;
    quantity: number;
    builtyNo: string;
  }[];
}

export default SalesDataProps;
