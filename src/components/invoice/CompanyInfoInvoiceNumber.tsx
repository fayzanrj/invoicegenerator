import Image from "next/image";
import React from "react";
import { RiWhatsappFill } from "react-icons/ri";

// Props
interface CompanyInfoInvoiceNumberProps {
  invoiceNumber: number;
}

const CompanyInfoInvoiceNumber: React.FC<CompanyInfoInvoiceNumberProps> = ({
  invoiceNumber,
}) => {
  return (
    <>
      {/* Invoice number and logo */}
      <div className="flex justify-between">
        <p>
          <span className="font-semibold font-sans">{invoiceNumber}</span> #بل
          نمبر
        </p>
        <Image src={"/logo.jpg"} alt="logo" width={110} height={100} />
      </div>

      {/* Comapny Info */}
      <div className="text-right my-2">
        {/* Name */}
        <h2 className="text-xl tracking-tighter font-bold">
          گلشن سٹین لیس سٹیل
        </h2>
        {/* Address */}
        <p className="text-xs mt-4 mb-3">
          گلی نمبر4، عثمانِ غنی کالونی، نوشہرہ روڈ گوجرانوالہ
        </p>
        {/* Contact number */}
        <p className="text-xs font-sans font-semibold">
          0300-8112024
          <span className="ml-1.5">
            <RiWhatsappFill
              size={"1.05rem"}
              className="inline-block align-middle"
            />
          </span>
        </p>
      </div>
    </>
  );
};

export default CompanyInfoInvoiceNumber;
