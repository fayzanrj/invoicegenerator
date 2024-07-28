import UrduFont from "@/constants/UrduFont";

export const InvoiceListTableHeading = () => (
  <thead>
    <tr>
      <th className="py-3 bg-black text-white w-1/4">گرینڈ ٹوٹل</th>
      <th className="bg-black text-white w-1/4">تاریخ</th>
      <th className="bg-black text-white w-1/4">خریدار</th>
      <th className="bg-black text-white w-1/4">#بل</th>
    </tr>
  </thead>
);

export const CustomerSalesTableHeading = () => (
  <thead>
    <tr className={UrduFont}>
      <th className="py-3 bg-black text-white w-1/4">بلٹی نمبر</th>
      <th className="bg-black text-white w-1/4">مقدار</th>
      <th className="bg-black text-white w-1/4">تفصیل</th>
      <th className="bg-black text-white w-1/4">تاریخ</th>
    </tr>
  </thead>
);

export const MonthlySalesTableHeading = () => (
  <thead>
    <tr>
      <th className="bg-black text-white w-1/3 py-3">مقدار</th>
      <th className="bg-black text-white w-1/3">تفصیل</th>
      <th className="bg-black text-white w-1/3">نمبر</th>
    </tr>
  </thead>
);

export const SalesByDateTableHeading = () => (
  <thead>
    <tr>
      <th className="py-3 bg-black text-white w-[6%]"></th>
      <th className="py-3 bg-black text-white w-[10%]">بلٹی نمبر</th>
      <th className="bg-black text-white w-1/5">مقدار</th>
      <th className="bg-black text-white w-1/5">تفصیل</th>
      <th className="bg-black text-white w-1/5">خریدار</th>
      <th className="bg-black text-white w-1/5">نمبر</th>
    </tr>
  </thead>
);

export const CustomerListTableHeading = () => (
  <thead>
    <tr>
      <th className="py-3 bg-black text-white w-1/4">تاریخ تخلیق</th>
      <th className="bg-black text-white w-1/4">نام</th>
      <th className="bg-black text-white w-1/4"> گاہک نمبر</th>
    </tr>
  </thead>
);

export const SalesListTableHeading = () => (
  <thead>
    <tr className={UrduFont}>
      <th className="py-3 bg-black text-white w-[6%]"></th>
      <th className="py-3 bg-black text-white w-[10%]">بلٹی نمبر</th>
      <th className="bg-black text-white w-1/6">مقدار</th>
      <th className="bg-black text-white w-1/6">تفصیل</th>
      <th className="bg-black text-white w-1/6">خریدار</th>
      <th className="bg-black text-white w-1/6">تاریخ خرید</th>
      <th className="bg-black text-white w-1/6">تاریخ</th>
    </tr>
  </thead>
);

export const SearchedCustomerTableHeading = () => (
  <thead>
    <tr className={UrduFont}>
      <th className="py-3 bg-black text-white w-1/2">نام</th>
      <th className="bg-black text-white w-1/2">گاہک نمبر</th>
    </tr>
  </thead>
);
