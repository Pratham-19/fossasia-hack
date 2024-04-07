import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "./_components/Navbar";
import Provider from "./_components/_config/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DollarLink",
  description: "Nextgen payment ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"min-h-screen antialiased font-sora text-base"}>
        <Provider>
          <Navbar />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
