"use client";
import handleApiError from "@/libs/server/HandleApiError";
import {
  LogInFormSchema,
  LogInInputType,
} from "@/utilities/formSchema/LogInFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import FormLayout from "./FormLayout";
import AuthInputField from "./AuthInputField";
import ScreenLoader from "../shared/ScreenLoader";

const LogInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  // React-hook-fotm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInInputType>({
    resolver: zodResolver(LogInFormSchema),
  });

  // Form submission
  const processForm: SubmitHandler<LogInInputType> = async (data) => {
    try {
      setIsLoading(true);
      // Logging in
      const res = await signIn("credentials", {
        username: data.username.toLowerCase(),
        password: data.password,
        redirect: false,
      });

      if (res && res.ok) {
        toast.success("Logged in successfully. Redirecting to dashboard.");
        router.push("/dashboard");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // If user is logged in the redirecting to dashboard
    if (status === "authenticated") router.push("/dashboard");
  }, [status]);

  // Loading state if authetication is loading
  if (status === "loading" || status === "authenticated") {
    return <ScreenLoader />;
  }

  return (
    <FormLayout
      variant="LOG IN"
      isLoading={isLoading}
      handleSubmit={handleSubmit(processForm)}
    >
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
    </FormLayout>
  );
};

export default LogInForm;
