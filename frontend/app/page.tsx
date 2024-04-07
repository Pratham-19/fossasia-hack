"use client";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "zustand";
import { useAuthStore, AuthStore } from "@/store/zustand";

export default function Home() {
  const { domain } = useStore(useAuthStore, (state) => state) as AuthStore;

  const services = [
    {
      index: 0,
      img: "/integrate.png",
      title: "Integrate Easily",
      desc: "Integrate DollarLink API to receive instant payments in USDC",
    },
    {
      index: 1,
      img: "/accept.png",
      title: "Accept USDC",
      desc: "Accept USDC in any store, ultra fast and with zero commissions",
    },
    {
      index: 2,
      img: "/track.png",
      title: "Track your stores",
      desc: "Keep in track your stores finances, manage stores and create new ones.",
    },
  ];

  return (
    <main className="flex flex-col gap-12 justify-center items-center w-10/12 m-auto py-10">
      <Image src="/logo.svg" alt="GHO" width={400} height={400} />
      <div className="flex flex-col gap-6 py-6 items-center">
        <h2 className="text-3xl font-light">
          Easy <span className="font-semibold">USDC</span> payments for all
          types of business
        </h2>
        {domain ? (
          <Link
            href={"/dashboard"}
            className="bg-theme-300 w-fit px-6 py-2 text-bg-1 rounded-full text-md"
          >
            Your Dashboard
          </Link>
        ) : (
          <Link
            href={"/auth"}
            className="bg-theme-300 w-fit px-6 py-2 text-bg-1 rounded-full text-md"
          >
            Become a merchant
          </Link>
        )}

        <h2 className="text-3xl font-light">
          Ready, Pay, <span className="font-semibold">USDC!!!</span>
        </h2>
      </div>
      <div className="max-w-5xl w-8/12 relative h-80">
        <Image
          src="/hero.png"
          alt="store"
          width={2000}
          height={2000}
          className="w-full h-auto absolute bg-bg-2-60 rounded-3xl blur-box-light"
        />
      </div>
      <div className="flex gap-4 items-end z-10">
        {services.map(({ index, img, title, desc }) => (
          <div
            key={index}
            className="flex w-5/12 h-fit gap-4 rounded-2xl border-bg-1 bg-bg-2/95 p-4 items-center justify-center"
          >
            <div className="w-6/12">
              <Image
                src={img}
                alt="GHO"
                className="rounded-lg blur-box"
                width={500}
                height={500}
              />
            </div>

            <div className="w-2/4 flex flex-col gap-3">
              <h4 className="text-3xl font-semibold">{title}</h4>
              <p className="text-lg">{desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full rounded-3xl bg-bg-2 h-80 flex items-center overflow-hidden">
        <div className="w-[48%] h-80 relative rounded-xl">
          <Image
            src={"/land-1.jpg"}
            alt="wave"
            className="absolute top-10 left-10 rounded-3xl z-10 blur-box-fade"
            width={1000}
            height={1000}
          />
        </div>
        <div className="w-1/2 flex justify-center">
          <h1 className="text-5xl font-light w-5/6">
            Get Paid with{" "}
            <span className="font-semibold"> ZERO commisions</span>
          </h1>
        </div>
      </div>
      <div className="w-full rounded-3xl bg-bg-2 h-80 flex items-center overflow-hidden">
        <div className="w-1/2 flex justify-center ">
          <h1 className="text-4xl font-light w-3/4 leading-10">
            Create a wallet seamlessly and get a
            <span className="font-semibold py-1"> Personalized domain</span>
          </h1>
        </div>
        <div className="w-[48%] h-80 relative rounded-xl">
          <Image
            src={"/land-2.jpg"}
            alt="wave"
            className="absolute top-10 rounded-3xl z-10 blur-box-fade w-full"
            width={1000}
            height={1000}
          />
        </div>
      </div>
      <div className="w-full rounded-3xl bg-bg-2 h-80 flex items-center overflow-hidden">
        <div className="w-[48%]  h-80 relative rounded-xl ">
          <Image
            src={"/land-3.jpg"}
            alt="wave"
            className="absolute top-10 left-10 rounded-3xl z-10 blur-box-fade"
            width={1000}
            height={1000}
          />
        </div>
        <div className="w-1/2 flex justify-center ">
          <h1 className="text-4xl font-semibold w-3/4 leading-10">
            Create, manage and keep track
            <span className=" font-light py-1"> of multiple stores easily</span>
          </h1>
        </div>
      </div>
    </main>
  );
}
