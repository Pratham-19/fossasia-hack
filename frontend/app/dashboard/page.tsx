"use client";
import React, { useEffect } from "react";
import MyCircularProgressBar from "../_components/CircularProgressBar ";
import {
  CircleUserRound,
  Database,
  LandmarkIcon,
  PiggyBank,
  Search,
} from "lucide-react";
import { useAuthStore, AuthStore } from "@/store/zustand";
import { Input } from "../_components/ui/input";
import GhoToken from "../_constant/GhoTokenABI.json";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../_components/ui/table";
import {
  // prepareWriteContract,
  // waitForTransaction,
  // writeContract,
  fetchBalance,
} from "wagmi/actions";
import SalesTable from "../_components/SalesTable";
import { useStore } from "zustand";
const Dashboard = () => {
  // type Column = {
  //   header: string;
  //   cell: keyof Row;
  // };
  interface Row {
    date: string;
    action: string;
    detail: string;
    address: string;
    store: string;
    amount: number;
    [key: string]: Date | string | number;
  }
  // const columns = [
  //   { header: "Date", cell: "date" },
  //   { header: "Action", cell: "action" },
  //   { header: "Detail", cell: "detail" },
  //   { header: "Address", cell: "address" },
  //   { header: "Store", cell: "store" },
  //   { header: "Amount", cell: "amount" },
  // ];

  const { domain, aaAddress } = useStore(
    useAuthStore,
    (state) => state
  ) as AuthStore;

  const [ghoBalance, setGhoBalance] = React.useState("0");

  useEffect(() => {
    if (!aaAddress) return;
    const getBalance = async () => {
      const balance = await fetchBalance({
        address: aaAddress as `0x${string}`,
        token: GhoToken.address as `0x${string}`,
      });
      setGhoBalance(balance.formatted);
    };

    getBalance();
  }, [aaAddress]);

  const rows: Row[] = [
    {
      date: "20220101",
      action: "sent",
      detail: "Nike shoes",
      address: "ghost.ghoat",
      store: "store.ghoat",
      amount: 32.256,
    },
    {
      date: "20220101",
      action: "sent",
      detail: "Nike shoes",
      address: "ghost.ghoat",
      store: "store.ghoat",
      amount: 32.256,
    },
  ];

  return (
    <div className="max-w-screen-2xl w-10/12 pt-8  m-auto flex flex-col gap-8 pb-10">
      <div className="flex p-6 w-full gap-6">
        <MyCircularProgressBar values={[50, 50, 60]} total={ghoBalance} />
        <div className="flex flex-col gap-4 w-full">
          <h4 className="text-3xl font-thin">My assets</h4>
          <div className="flex w-full items-center bg-theme-500 text-bg-1 rounded-full px-5 py-1">
            <PiggyBank className="mr-1.5" />
            <p className="text-lg w-28">Saved</p>
            <p>| 0</p>
          </div>
          <div className="flex w-full items-center bg-theme-300 text-bg-1 rounded-full px-5 py-1">
            <LandmarkIcon className="mr-1.5" />

            <p className="text-lg w-28">Borrowed</p>
            <p>| 0</p>
          </div>
          <div className="flex w-full items-center bg-theme-200 text-bg-1 rounded-full px-5 py-1">
            <Database className="mr-1.5" />

            <p className="text-lg w-28">Staked</p>
            <div>| 0</div>
          </div>
        </div>
        <div className="flex gap-6 flex-col  w-full bg-bg-2 rounded-3xl p-5">
          <h2 className="text-4xl font-semibold">My Wallet</h2>

          <div className="bg-theme-300 px-4 py-2 flex flex-col w-fit text-theme-500 rounded-r-full">
            <p className="text-lg flex gap-2">
              <CircleUserRound />
              Me
            </p>
            <p className="text-lg text-bg-1 font-semibold pr-4">{domain}</p>
          </div>
          {/* <h2 className="">
            {aaAddress?.substring(0, 8)}...
            {aaAddress?.substring(aaAddress.length - 5)}
          </h2> */}
          {/* <h2 className="hidden peer-hover:block ml-2">{aaAddress}</h2> */}
        </div>
      </div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold">Transfer history</h2>
        <div className="flex items-center px-2 rounded-xl h-9">
          <Input
            type="name"
            placeholder="Search by payment name"
            className="rounded-xl rounded-r-none border-none h-full bg-bg-2-60 text-theme-300 placeholder:text-theme-300 w-full"
          />
          <Search className="rounded-xl rounded-l-none h-full flex items-center justify-center w-16 py-1 text-bg-1 bg-theme-200" />
        </div>
      </div>
      <SalesTable />
    </div>
  );
};

export default Dashboard;
