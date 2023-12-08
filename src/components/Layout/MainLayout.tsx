import React, { useState } from "react";
import TopNavbar from "./TopNavbar";
import { Inter } from "next/font/google";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import TopNoti from "../Notification/TopNoti";

const inter = Inter({ subsets: ["latin"] });

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    // <main
    //   className={`${inter.className} custom-light flex flex-col h-screen w-full items-center `}
    // >
    <div>
      {!isOpen && <TopNoti setOpen={setIsOpen} />}
      <TopNavbar />
      <main
        className={`${inter.className} custom-light w-full bg-[#F4F4F5]  flex e3r4 justify-center min-h-screen `}
      >
        <div className="w-full max-w-[1200px] px-6 pb-32">{children}</div>
      </main>
      <Footer />
    </div>

    // </main>
  );
}
