"use client";

import SalesTable from "@/app/_components/SalesTable";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Slider } from "@/app/_components/ui/slider";
import { Loader2, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { Store, ClipboardCopy } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Shop = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const topStores = ["shoes.ghoat", "stickers.ghoat"];
  const [storeData, setStoreData] = React.useState<{
    name: string;
    desc: string;
    owner: string;
    slug: string;
    sales: string;
  }>();

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (!params.slug) return;
    setLoading(true);
    const fetchStores = async () => {
      await axios
        .post("/api/store/fetchShopByName", {
          slug: params.slug,
        })
        .then((res) => {
          if (!res.data?.data.length) {
            router.push("/store");
          }
          console.log(res.data?.data[0]);
          setStoreData(res.data?.data[0]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchStores();
  }, [params.slug]);

  if (false) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Loader2 className="w-10 h-10 text-theme-300 animate-spin ease-in-out" />
      </div>
    );
  }

  const calStoreApi = ({
    name,
    slug,
    address,
  }: {
    name: string;
    slug: string;
    address: string;
  }) => {
    const apiKey = window.btoa(JSON.stringify({ name, slug, address }));
    console.log(apiKey);
    return apiKey;
  };

  return (
    <div className="w-10/12 max-w-screen-2xl m-auto py-6 flex flex-col gap-6">
      <div className="flex justify-between relative h-fit px-6 py-5">
        <Image
          src="/store1.jpg"
          alt="store"
          layout="fill"
          objectFit="cover"
          className="w-full h-fit rounded-xl "
        />
        <Link
          href={"/store"}
          className="flex h-fit rounded-full z-10 px-6 py-1 bg-theme-300 text-bg-1 "
        >
          <Store className="w-5 h-5 mr-2" />
          Back to store
        </Link>
        <div className="z-10 w-8/12 gap-4 flex flex-col justify-center">
          <h2 className="text-4xl font-semibold">
            {storeData?.name ?? "The Shoe King"}
          </h2>
          <p className="text-xl font-extralight">
            {storeData?.desc ??
              "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, tenetur pariatur non ea corrupti reiciendis quibusdam repellat voluptatum maxime, atque dolore sunt modi, impedit neque accusamus recusandae illum vitae."}
          </p>
          <div className="w-full rounded-xl flex flex-col gap-3 bg-bg-1 py-5 px-4">
            <h4 className="text-2xl font-semibold">This Store API key</h4>
            <button
              className="flex text-md font-extralight py-1.5 bg-theme-300 rounded-full text-bg-1 px-2 truncate"
              onClick={() => {
                navigator.clipboard.writeText(
                  calStoreApi({
                    name: storeData?.name!,
                    slug: storeData?.slug!,
                    address: storeData?.owner!,
                  })
                );
                toast.success("Copied to clipboard");
              }}
            >
              <h2 className="truncate">
                {calStoreApi({
                  name: storeData?.name!,
                  slug: storeData?.slug!,
                  address: storeData?.owner!,
                })}
              </h2>

              <ClipboardCopy className="w-7 h-7 ml-2" />
            </button>
          </div>
        </div>
        <div className="absolute rounded-xl inset-0 bg-linear-grad pointer-events-none"></div>
      </div>
      {/* Transfer */}
      <div className="flex gap-4 w-full rounded-xl p-2 bg-bg-2">
        <div className="w-7/12 rounded-lg flex flex-col gap-3 bg-bg-1 py-5 px-4">
          <h2 className="text-xl font-semibold">Quick Transfer</h2>
          <Input
            placeholder="Type address or ens"
            className="rounded-full border-none text-lg font-thin py-2 bg-bg-2-60 text-theme-200 placeholder:text-theme-200 w-full"
          />
          <div className="flex gap-4 ">
            <div className="flex gap-4 flex-col items-center  flex-1">
              <Input
                placeholder="Type GHO amount"
                className="bg-bg-2-60 ring-none border-none text-theme-300 placeholder:text-theme-300 py-1 w-full rounded-full px-2"
              />
              <Slider
                defaultValue={[33]}
                max={100}
                step={1}
                className="bg-theme-200 rounded-full"
              />
              <div className="flex justify-between w-full">
                <p>0%</p>
                <p>25%</p>
                <p>50%</p>
                <p>75%</p>
                <p>Max</p>
              </div>
            </div>
            <div className="w-fit gap-1 flex justify-between flex-col">
              <Button className="bg-theme-300 w-full text-bg-1 rounded-full">
                Send
              </Button>
              <p className="font-thin text-sm">Estimated deposit time</p>
              <p className="text-sm font-thin text-right">20 seconds</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">My top stores</h2>
          <div className="flex flex-wrap gap-4 py-4">
            {topStores.map((store, index) => (
              <p
                key={index}
                className="text-md font-extralight py-0.5  px-4  bg-theme-300 rounded-full text-bg-1"
              >
                {store}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        {/* Dashboard */}
        <div className="w-5/12 ">
          <div className="grid grid-cols-2 gap-4">
            <div className=" rounded-xl flex flex-col justify-center items-center gap-3 bg-bg-2 py-5 px-4">
              <p>Total Revenue</p>
              <h4 className="text-3xl font-semibold">0</h4>
              <p className="text-md font-extralight text-theme-500">+0 month</p>
            </div>
            <div className="rounded-xl flex flex-col justify-center items-center gap-3 bg-bg-2 py-5 px-4">
              <p>Monthly sales</p>
              <h4 className="text-3xl font-semibold">0</h4>
              <p className="text-md font-extralight text-theme-500">+0 month</p>
            </div>
          </div>
        </div>
        <div className="w-10/12 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Sales history</h2>
            <div className="flex items-center px-2 rounded-xl h-9">
              <Input
                type="name"
                placeholder="Search by payment name"
                className="rounded-xl rounded-r-none border-none h-full bg-theme-300 text-bg-1 placeholder:text-bg-1 w-full"
              />
              <Search className="rounded-xl rounded-l-none h-full flex items-center justify-center w-16 py-1 text-bg-1 bg-theme-200" />
            </div>
          </div>
          <SalesTable />
        </div>
      </div>
    </div>
  );
};

export default Shop;
