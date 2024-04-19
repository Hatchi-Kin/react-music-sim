"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAltSlash } from "react-icons/fa";
import React from "react";
import Button from "./Button";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();

  const handlelogout = () => {
    // Remove the API key from local storage and redirect to the login page
    localStorage.removeItem('authToken');
    router.push("/");
  };

  return (
    <div
      className={twMerge(
        `
        h-fit bg-gradient-to-b from-slate-800 p-6 
        `,
        className
      )}
    >
      <div className={twMerge(`flex justify-between gap-x-4 items-center`)}>
        <div className={twMerge(`flex items-center gap-x-4`)}>
          <div className={twMerge(`flex-col justify-start gap-x-4`)}>
            <button
              className={twMerge(`
                                border-2 justify-center bg-white rounded-full flex p-2 hover:opacity-75 transition
                                `)}
            >
              <HiHome className={twMerge(`text-black`)} size={20} />
            </button>
          </div>
          <div className={twMerge(`flex-col justify-start gap-x-4`)}>
            <button
              className={twMerge(`
                                border-2 justify-center bg-white rounded-full flex p-2 hover:opacity-75 transition
                                `)}
            >
              <BiSearch className={twMerge(`text-black`)} size={20} />
            </button>
          </div>
        </div>

        <div className={twMerge(`flex-col-reverse justify-end gap-x-4`)}>
          <Button
            onClick={handlelogout}
            className={twMerge(`
            flex items-center space-x-2  border-2 border-white text-white rounded-xl px-4 py-2 hover:bg-indigo-950 transition
          `)}
          >
            <div>Logout</div>
            <div>
              <FaUserAltSlash />
            </div>
          </Button>
        </div>
      </div>
      <div
        className={twMerge(
          `
            flex justify-between items-center
            `,
          className
        )}
      >
        <div
          className={twMerge(`
                flex  items-center justify-between gap-x-4
                `)}
        >
          <p
            className={twMerge(`
                    text-white font-bold text-2xl p-4
                    `)}
          >
            Music Similarity
          </p>
          <button
            onClick={() => {
              router.back();
            }}
            className={"rounded-full bg-black flex items-center"}
          >
            <RxCaretLeft className={twMerge(`text-white`)} size={35} />
          </button>
          <button
            onClick={() => {
              router.forward();
            }}
            className={"rounded-full bg-black flex items-center"}
          >
            <RxCaretRight className={twMerge(`text-white`)} size={35} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
