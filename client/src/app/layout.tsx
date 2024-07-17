import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Gulshan Steels",
    template: `%s - Gulshan Steels`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-y-auto`}>
        <NextAuthProvider>
          <NextTopLoader color="#000000" zIndex={1600} />
          <Toaster
            position="top-right"
            toastOptions={{
              className: "text-[1.05rem]",
            }}
          />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
