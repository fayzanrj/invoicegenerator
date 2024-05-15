"use client";
import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import AuthInputLabel from "./AuthInputLabel";

// Props
interface AuthInputFieldProps {
  label: string;
  type: "text" | "password";
  id: string;
  placeHolder: string;
  errors: any;
  register: any;
  disabled: boolean;
}

const AuthInputField: React.FC<AuthInputFieldProps> = ({
  label,
  type,
  id,
  placeHolder,
  errors,
  register,
  disabled,
}) => {
  const [inputType, setInputType] = useState(type);

  // Function to toggle password visibility
  const showPassword = () =>
    setInputType((prev) => (prev === "password" ? "text" : "password"));

  return (
    <div className="w-full sm:max-w-96">
      {/* Label */}
      <AuthInputLabel id={id} label={label} errors={errors} />

      {/* Field */}
      <div className="relative">
        <input
          id={id}
          type={inputType}
          placeholder={placeHolder}
          {...register(id)}
          disabled={disabled}
          className="w-full p-2 border-2 border-gray-300 my-1 outline-none rounded-md disabled:opacity-50"
        />

        {/* Show password button */}
        {type === "password" && (
          <button
            onClick={showPassword}
            type="button"
            className="absolute -translate-y-1/2 right-3 top-1/2"
          >
            {/* Toggling eye icon based on password visibility */}
            {inputType === "password" ? (
              <IoEye color={"#000000"} size={"1.2rem"} />
            ) : (
              <IoEyeOff color={"#000000"} size={"1.2rem"} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthInputField;
