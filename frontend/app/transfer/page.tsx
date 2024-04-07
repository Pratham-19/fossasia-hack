"use client";
import Image from "next/image";
import React from "react";
import { Input } from "../_components/ui/input";
import { Button } from "../_components/ui/button";
import { Slider } from "../_components/ui/slider";
import { TurnkeySigner } from "@turnkey/ethers";
import GhoToken from "../_constant/GhoTokenABI.json";
import {
  ECDSAProvider,
  convertEthersSignerToAccountSigner,
} from "@zerodev/sdk";
import { AuthStore, useAuthStore } from "@/store/zustand";
import { getTurnkeyHttpClient } from "@/config/turnkey-client";
import { useStore } from "zustand";
import { toast } from "sonner";
import { encodeFunctionData, parseEther, Hex } from "viem";

const Transfer = () => {
  const [sendGho, setSendGho] = React.useState("0");
  const [senderAddress, setSenderAddress] = React.useState("");

  const { organizationId, walletAddress } = useStore(
    useAuthStore,
    (state) => state
  ) as AuthStore;

  const handleTransfer = async () => {
    if (!senderAddress || !sendGho) {
      toast.error("Please fill all fields");
      return;
    }
    const turnkeySigner: any = new TurnkeySigner({
      client: getTurnkeyHttpClient(window.location.hostname),
      organizationId,
      signWith: walletAddress!,
    });

    const zerodevSigner = await ECDSAProvider.init({
      projectId: process.env.NEXT_PUBLIC_ZERODEV_PROJECT ?? "",
      owner: convertEthersSignerToAccountSigner(turnkeySigner),
    });

    const { hash } = await zerodevSigner.sendUserOperation({
      target: GhoToken.address as Hex,
      data: encodeFunctionData({
        abi: GhoToken.abi,
        functionName: "transfer",
        args: [senderAddress, parseEther(sendGho)],
      }),
    });
    console.log(hash);

    setTimeout(() => {
      toast.success("Transfer successful");
      setSendGho("");
      setSenderAddress("");
    }, 1000);
  };

  return (
    <div className="w-10/12 max-w-screen-xl m-auto">
      <h2 className="text-5xl font-semibold py-6">Transfer</h2>
      <div className=" min-h-[70vh] m-auto flex flex-col justify-center">
        <div className="flex justify-center items-center h-full">
          <div className="flex justify-between w-full">
            <Image
              src="/transfer.png"
              width={1000}
              height={1000}
              alt="store"
              className="h-auto max-w-sm "
            />
            <div className="flex flex-col gap-6 p-6 w-7/12 bg-bg-2 rounded-xl ">
              <h3 className="text-2xl ">
                <span className="font-semibold">Transfer GHO</span> instantly
                with <span className="font-semibold">Zero fees</span>
              </h3>
              <div className="w-full p-4 flex flex-col gap-4 bg-bg-1 rounded-xl">
                <h3 className="text-xl font-semibold">Type receiver address</h3>
                <Input
                  type="name"
                  placeholder="Type receiver ens or EOA address"
                  value={senderAddress}
                  onChange={(e) => setSenderAddress(e.target.value)}
                  className="rounded-xl border-none py-5 bg-bg-2-60 text-theme-300 placeholder:text-theme-300 w-full"
                />
              </div>
              <div className="gap-6 p-2 w-full flex">
                <div className="flex gap-4 flex-col items-center  flex-1">
                  <Input
                    placeholder="Type GHO amount"
                    value={sendGho}
                    onChange={(e) => setSendGho(e.target.value)}
                    className="bg-bg-2-60 border-2 border-theme-500 ring-none text-theme-300 placeholder:text-theme-300 py-1 w-full rounded-xl px-2"
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
                  <Button
                    className="bg-theme-300 hover:bg-theme-300 w-full text-bg-1 rounded-full"
                    onClick={handleTransfer}
                  >
                    Send
                  </Button>
                  <p className="font-thin text-sm">Estimated deposit time</p>
                  <p className="text-sm font-thin text-right">20 seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
