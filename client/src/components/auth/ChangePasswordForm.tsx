"use client";
import useHeaders from "@/hooks/useHeaders";
import handleApiError from "@/libs/HandleApiError";
import {
  ChangePasswordInputType,
  ChangePasswordSchema,
} from "@/utilities/formSchema/ChangePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import AuthInputField from "./AuthInputField";
import FormLayout from "./FormLayout";

const ChangePasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const headers = useHeaders();

  // React-hook-form
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInputType>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  // Form submission
  const processForm: SubmitHandler<ChangePasswordInputType> = async (data) => {
    const { confirmNewPassword, newPassword } = data;

    // Checking if confirm password is same as password
    if (confirmNewPassword !== newPassword) {
      setError(
        "confirmNewPassword",
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
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/changePassword`,
        { ...data },
        {
          headers,
        }
      );

      toast.success(res.data.message);
      // Resetting form
      reset();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormLayout
      variant="CHANGE PASSWORD"
      isLoading={isLoading}
      handleSubmit={handleSubmit(processForm)}
    >
      <AuthInputField
        id="oldPassword"
        type="password"
        label="Old Password"
        placeHolder="e.g. *******"
        register={register}
        errors={errors}
        disabled={isLoading}
      />
      <AuthInputField
        id="newPassword"
        type="password"
        label="New Password"
        placeHolder="e.g. *******"
        register={register}
        errors={errors}
        disabled={isLoading}
      />
      <AuthInputField
        id="confirmNewPassword"
        type="password"
        label="Confirm New Password"
        placeHolder="e.g. *******"
        register={register}
        errors={errors}
        disabled={isLoading}
      />
    </FormLayout>
  );
};

export default ChangePasswordForm;
