import React from "react";
import CustomerProps from "@/props/CustomerProps";

// Props
interface SelectInputBaseProps {
  label: string;
  srOnly?: boolean;
  id: string;
  value: string;
  placeholder: string;
  required?: boolean;
  className?: string;
  onChange: (value: string) => void;
}

interface SelectCustomerProps extends SelectInputBaseProps {
  variant: "CUSTOMERS";
  options: CustomerProps[];
}

interface SelectInputOptionProps extends SelectInputBaseProps {
  variant: "OPTIONS";
  options: string[];
}

type SelectInputProps = SelectCustomerProps | SelectInputOptionProps;

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  id,
  value,
  options,
  srOnly = false,
  required = false,
  className = "",
  placeholder = "",
  onChange,
  variant,
}) => {
  return (
    <div className={className}>
      {/* LABEL */}
      <label
        htmlFor={id}
        className={`text-sm font-semibold float-right ${
          srOnly ? "sr-only" : ""
        }`}
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        required={required}
        className="w-full p-2 border-2 border-gray-300 mb-1 mt-3 outline-none rounded-md disabled:opacity-50 text-right"
        onChange={(e) => {
          const selectedValue =
            variant === "CUSTOMERS"
              ? (options as CustomerProps[]).find(
                  (option) => option._id === e.currentTarget.value
                )?._id
              : e.currentTarget.value;
          onChange(selectedValue || "");
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {variant === "CUSTOMERS"
          ? (options as CustomerProps[]).map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))
          : (options as string[]).map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
      </select>
    </div>
  );
};

export default SelectInput;
