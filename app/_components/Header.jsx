"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const path = usePathname();

  return (
    <div className="flex items-center justify-between p-5 shadow-sm bg-secondary">
      <Image src={"./logo.svg"} height={100} width={160} alt="logo" />
      <ul className="hidden gap-5 md:flex">
        <li
          className={`transition-all cursor-pointer hover:text-primary hover:font-bold ${
            path === "/dashboard" && "text-primary font-bold"
          }`}
        >
          Dashboard
        </li>
        <li
          className={`transition-all cursor-pointer hover:text-primary hover:font-bold ${
            path === "/dashboard/questions" && "text-primary font-bold"
          }`}
        >
          Questions
        </li>
        <li
          className={`transition-all cursor-pointer hover:text-primary hover:font-bold ${
            path === "/dashboard/upgrade" && "text-primary font-bold"
          }`}
        >
          Upgrade
        </li>
        <li
          className={`transition-all cursor-pointer hover:text-primary hover:font-bold ${
            path === "/dashboard/about" && "text-primary font-bold"
          }`}
        >
          About
        </li>
        <li
          className={`transition-all cursor-pointer hover:text-primary hover:font-bold ${
            path === "/dashboard/How" && "text-primary font-bold"
          }`}
        >
          How it works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;
