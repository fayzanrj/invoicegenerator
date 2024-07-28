"use client";
import React, { FormEvent } from "react";
import Loader from "./Loader";
import Image from "next/image";
import ButtonLayout from "./ButtonLayout";
import UrduFont from "@/constants/UrduFont";

// Props
interface FormLayoutProps {
  variant:
    | "ADD USER"
    | "LOG IN"
    | "CHANGE PASSWORD"
    | "REMOVE USER"
    | "ADD CUSTOMER";
  handleSubmit: (() => void) | ((e: FormEvent) => void);
  isLoading: boolean;
  children: React.ReactNode;
  showHeading?: boolean;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  handleSubmit,
  isLoading,
  variant,
  showHeading = true,
  children,
}) => {
  // Mapping variant to Urdu text
  const getHeadingText = (variant: string) => {
    switch (variant) {
      case "ADD USER":
        return "نیا صارف شامل کریں";
      case "LOG IN":
        return "لاگ ان کریں";
      case "CHANGE PASSWORD":
        return "پاس ورڈ  تبدیل کریں";
      case "REMOVE USER":
        return "صارف کو ہٹائیں";
      case "ADD CUSTOMER":
        return "نیا گاہک شامل کریں";
      default:
        return "";
    }
  };

  return (
    <form
      className="bg-white w-[95%] max-w-96 px-3 py-4 drop-shadow-xl shadow-lg rounded-lg"
      onSubmit={handleSubmit}
    >
      {/* Heading */}
      {showHeading && (
        <div className={`${variant === "LOG IN" ? "flex justify-between items-center" : "" } px-4`}>
          {variant === "LOG IN" && (
            <Image
              src={"/logo.jpg"}
              alt="logo"
              width={200}
              height={60}
              quality={100}
              className="w-16 h-12"
            />
          )}

          <h3 className={`${UrduFont} text-2xl font-semibold text-right`}>
            {getHeadingText(variant)}
          </h3>
        </div>
      )}

      <div className="py-6 text-left">{children}</div>

      <ButtonLayout
        type="submit"
        disabled={isLoading}
        fullWidth
        className={UrduFont}
      >
        {isLoading ? <Loader /> : getHeadingText(variant)}
      </ButtonLayout>
    </form>
  );
};

export default FormLayout;
