import React from "react";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import WalletConnect from "../Wallet";
import { MENU } from "@/constants/menu";

export default function TopNavbar() {
  const router = useRouter();

  return (
    <Navbar
      shouldHideOnScroll={false}
      maxWidth="full"
      className="px-[10rem] bg-[#FFF]"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          // "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarBrand className="pr-0 mr-0 max-w-[180px]">
        <div
          onClick={() => router.push("/")}
          className="select-none cursor-pointer flex items-center"
        >
          <Image
            src="/azurance-logo.png"
            alt="Shout Logo"
            width={136}
            height={36}
          />
          {/* <p className="text-[#0F1419] font-bold text-2xl ml-3">Azurance</p> */}
        </div>
      </NavbarBrand>
      <NavbarContent justify="start">
        {MENU.map((menu) => (
          <NavbarItem
            key={menu.name}
            isActive={router.pathname === menu.path}
            className="mx-1"
          >
            <Link href={menu.path} className="text-[#0F1419] text-sm">
              {menu.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="flex">
          <div className="my-auto">
            <WalletConnect />
          </div>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
