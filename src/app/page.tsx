import LogInForm from "@/components/auth/LogInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
};

export default function Home() {
  return (
    <main className="w-full h-svh flex justify-center items-center flex-wrap">
      <LogInForm />
    </main>
  );
}
