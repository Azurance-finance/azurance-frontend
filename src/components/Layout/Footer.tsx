import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Input } from "@nextui-org/react";

const Footer = () => {
  const router = useRouter();
  return (
    <>
      <div className="py-12 w-full flex justify-center ">
        <div className="w-full flex justify-between   max-w-[1200px] ">
          <div>
            <div
              onClick={() => router.push("/")}
              className="select-none cursor-pointer flex items-center"
            >
              <Image
                src="/azurance-logo.png"
                alt="Shout Logo"
                width={108}
                height={28}
              />
              {/* <p className="text-[#0F1419] font-semibold text-sm ml-2">
                Azurance
              </p> */}
            </div>
            <p className=" text-sm font-normal text-[#0F1419] mt-3">
              Decentralized insurance platform that providing flexible
              conditions
              <p>
                on-chain. Relying on government database and Chainlink
                datastream
              </p>
            </p>
          </div>
          <div>
            <p className="text-[#0F1419] font-semibold text-sm ">Newsletter</p>
            <p className="text-sm font-normal my-2 text-[#5B616E]">
              Stay up to date on all things Azurance.
            </p>
            <div className="flex justify-between pt-2">
              <Input
                type="email"
                label="Enter your email"
                size="sm"
                radius="md"
                className=" w-[280px] h-10"
              />
              <Button className="bg-[#0F1419] text-white ml-[10px] h-10 px-6 text-sm font-medium">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center h-14 py-3 bg-gradient-to-b from-blue-600 to-blue-700 ">
        <div className="flex w-full max-w-[1200px]">
          <p className="my-auto text-xs  text-white font-medium">
            Copyright © Azurance 2023. All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
