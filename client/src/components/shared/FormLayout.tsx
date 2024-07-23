import React, { FormEvent } from "react";
import Loader from "./Loader";
import Image from "next/image";
import ButtonLayout from "./ButtonLayout";

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
  return (
    <form
      className="bg-white w-[95%] max-w-96 px-3 py-4 drop-shadow-xl shadow-lg rounded-lg"
      onSubmit={handleSubmit}
    >
      {/* Heading */}
      {showHeading && (
        <section className="flex justify-between items-center px-4">
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
        </section>
      )}

      <section className="py-6 text-left">{children}</section>

      <ButtonLayout type="submit" disabled={isLoading} fullWidth>
        {isLoading ? <Loader /> : variant}
      </ButtonLayout>
    </form>
  );
};

export default FormLayout;
