"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthStore, useAuthStore } from "@/store/zustand";
import { useStore } from "zustand";
import { LogOutIcon } from "lucide-react";

const Navbar = () => {
  const route = usePathname();
  const active = "border-b-4 border-theme-200 font-semibold";
  const values = {
    dashboard: "Dashboard",
    store: "Store",
    transfer: "Transfer",
  };

  const { domain } = useStore(useAuthStore, (state) => state) as AuthStore;

  return (
    <nav className="w-11/12 mx-auto flex text-xl bg-bg-1 shadow-[#032F03]/20 shadow-lg p-2 mt-5 rounded-full justify-between ">
      <div className="flex items-center  gap-10">
        <Link href="/">
          <Image src="/logo.svg" alt="GHO" width={120} height={120} />
        </Link>
        {route != "/auth" && route != "/" ? (
          <>
            {Object.entries(values).map(([key, label]) => (
              <Link
                key={key}
                href={`/${key}`}
                className={`${route === `/${key}` ? active : ""}`}
              >
                {label}
              </Link>
            ))}{" "}
          </>
        ) : null}
      </div>
      <div className="bg-theme-300 text-bg-1 rounded-3xl px-4 py-0.5">
        <p className="text-lg ">
          {domain ? (
            <button
              className="flex items-center gap-2"
              onClick={() => {
                window.localStorage.removeItem("auth");
                window.location.replace("/auth");
              }}
            >
              <LogOutIcon size={22} />
              {domain}
            </button>
          ) : (
            <Link href="/auth">Get started</Link>
          )}
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
