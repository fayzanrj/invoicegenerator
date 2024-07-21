"use client";
import React, { useState } from "react";
import AuthInputLabel from "./AuthInputLabel";
import ShowPasswordButton from "./ShowPasswordButton";

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
  // State
  const [inputType, setInputType] = useState(type);

  // Function to toggle password visibility
  const togglePassword = () =>
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
          <ShowPasswordButton inputType={inputType} onClick={togglePassword} />
        )}
      </div>
    </div>
  );
};

export default AuthInputField;
