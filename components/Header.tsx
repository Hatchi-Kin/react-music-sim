"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiHeadphone } from "react-icons/bi";
import { LiaDiceD6Solid } from "react-icons/lia";
import { FaUserAltSlash } from "react-icons/fa";
import React from "react";
import Button from "./Button";
import Link from "next/link";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();

  const displayName = localStorage.getItem("displayName");

  const handlelogout = () => {
    // Remove the API key from local storage and redirect to the login page
    localStorage.removeItem("authToken");
    localStorage.removeItem("displayName");
    router.push("/");
  };

  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-slate-800 p-6`, className)}>
      <div className={twMerge(`flex justify-between gap-x-4 items-center`)}>
        <div className={twMerge("text-slate-300 md:flex hidden font-bold text-xl p-4")}>
          Hello {displayName} !
        </div>

        <div className={twMerge(`flex items-center gap-x-4`)}>
          <div className={twMerge(`flex-col justify-start gap-x-4`)}>
            <Link href="/homepage">
              <button
                className={twMerge(`
                  border-2 md:hidden justify-center bg-slate-400 rounded-full flex p-2 hover:opacity-75 transition
                  `)}
              >
                <HiHome className={twMerge(`text-black`)} size={20} />
              </button>
            </Link>
          </div>
          <div className={twMerge(`flex-col justify-start gap-x-4`)}>
            <Link href="/homepage/random-song">
              <button
                className={twMerge(`
                  border-2  md:hidden justify-center bg-slate-400 rounded-full flex p-2 hover:opacity-75 transition
                  `)}
              >
                <LiaDiceD6Solid className={twMerge(`text-black`)} size={20} />
              </button>
            </Link>
          </div>
          <div className={twMerge(`flex-col justify-start gap-x-4`)}>
            <Link href="/homepage/byartist">
              <button
                className={twMerge(`
                  border-2  md:hidden justify-center bg-slate-400 rounded-full flex p-2 hover:opacity-75 transition
                  `)}
              >
                <BiHeadphone className={twMerge(`text-black`)} size={20} />
              </button>
            </Link>
          </div>
        </div>

        <div className={twMerge(`flex-col-reverse justify-end gap-x-4`)}>
          <Button
            onClick={handlelogout}
            className={twMerge(`
            flex items-center space-x-2  border-2 border-slate-300 text-slate-300 rounded-xl px-4 py-2 hover:bg-amber-950 transition
          `)}
          >
            <div>Logout</div>
            <div>
              <FaUserAltSlash />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
