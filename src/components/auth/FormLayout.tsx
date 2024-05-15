import React, { FormEvent } from "react";
import Loader from "../shared/Loader";
import Image from "next/image";

// Props
interface FormLayoutProps {
  variant: "ADD USER" | "LOG IN" | "CHANGE PASSWORD" | "REMOVE USER";
  handleSubmit: (() => void) | ((e: FormEvent) => void);
  isLoading: boolean;
  children: React.ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  handleSubmit,
  isLoading,
  variant,
  children,
}) => {
  return (
    <form
      className="bg-white w-[95%] max-w-96 px-3 py-4 drop-shadow-xl shadow-lg rounded-lg"
      onSubmit={handleSubmit}
    >
      {/* Heading */}
      <div className="flex justify-between items-center px-4">
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

        <h3 className="text-2xl font-semibold">{variant}</h3>
      </div>

      <div className="py-6 text-left">{children}</div>

      <button
        disabled={isLoading}
        className="w-full h-10 text-lg rounded-lg font-semibold bg-black text-white disabled:opacity-50 relative"
      >
        {isLoading ? <Loader /> : variant}
      </button>
    </form>
  );
};

export default FormLayout;
