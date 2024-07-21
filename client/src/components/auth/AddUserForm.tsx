"use client";
import useHeaders from "@/hooks/useHeaders";
import handleApiError from "@/libs/HandleApiError";
import {
  RegisterUserInputType,
  RegisterUserSchema,
} from "@/utilities/formSchema/RegisterUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import AuthInputField from "./AuthInputField";
import FormLayout from "./FormLayout";
import RoleSelectInput from "./RoleSelectInput";

const AddUserForm = () => {
  // State
  const [isLoading, setIsLoading] = useState(false);
  // Headers
  const headers = useHeaders();

  // React-hook-form
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<RegisterUserInputType>({
    resolver: zodResolver(RegisterUserSchema),
  });

  // Form Submition
  const processForm: SubmitHandler<RegisterUserInputType> = async (data) => {
    // Destructuring
    const { confirmPassword, password } = data;

    // Checing if confirm password is same as password
    if (confirmPassword !== password) {
      setError(
        "confirmPassword",
        {
          message: "Passwords does not match",
        },
        { shouldFocus: true }
      );

      return;
    }

    try {
      setIsLoading(true);

      // API CALL
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/registerUser`,
        {
          ...data,
        },
        {
          headers,
        }
      );

      toast.success(res?.data?.message);
      // resetting form
      reset();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormLayout
      variant="ADD USER"
      isLoading={isLoading}
      handleSubmit={handleSubmit(processForm)}
    >
      <AuthInputField
        id="name"
        type="text"
        label="Display name"
        placeHolder="e.g. Admin"
        register={register}
        errors={errors}
        disabled={isLoading}
      />

      <AuthInputField
        id="username"
        type="text"
        label="Username"
        placeHolder="e.g. admin"
        register={register}
        errors={errors}
        disabled={isLoading}
      />

      <AuthInputField
        id="password"
        type="password"
        label="Password"
        placeHolder="e.g. *******"
        register={register}
        errors={errors}
        disabled={isLoading}
      />

      <AuthInputField
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        placeHolder="e.g. *******"
        register={register}
        errors={errors}
        disabled={isLoading}
      />

      <RoleSelectInput control={control} errors={errors} disabled={isLoading} />
    </FormLayout>
  );
};

export default AddUserForm;
