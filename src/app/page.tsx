import LogInForm from "@/components/auth/LogInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gulshan Steels",
};

export default function Home() {
  return (
    <main className="w-full h-svh flex justify-center items-center flex-wrap">
      <LogInForm />
    </main>
  );
}
