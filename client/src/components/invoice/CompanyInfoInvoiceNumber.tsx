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
      <div className="flex justify-between items-center">
        <p className="w-[25%] text-left">
          <span className="font-semibold font-sans">{invoiceNumber}</span> #بل
          نمبر
        </p>

        {/* Name */}
        <h2 className="w-1/2 text-2xl tracking-tighter font-bold text-center">
          گلشن سٹین لیس سٹیل
        </h2>

        <div className="w-[25%] text-right relative">
          <Image
            src={"/logo.jpg"}
            alt="logo"
            width={110}
            height={100}
            className="float-right"
          />
        </div>
      </div>

      {/* Comapny Info */}
      <div className="text-right my-2">
        {/* Address */}
        <p className="text-sm mt-4 mb-3">
          گلی نمبر4، عثمانِ غنی کالونی، نوشہرہ روڈ گوجرانوالہ
        </p>
        {/* Contact number */}
        <p className="text-sm font-sans font-semibold">
          0300-8112024
          <span className="ml-1.5">
            <RiWhatsappFill
              size={"1.15rem"}
              className="inline-block align-middle"
            />
          </span>
        </p>
      </div>
    </>
  );
};

export default CompanyInfoInvoiceNumber;
