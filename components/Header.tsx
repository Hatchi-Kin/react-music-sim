"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { HiHome } from "react-icons/hi";
import { BiHeadphone, BiDice3 } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
import { LiaDiceD6Solid } from "react-icons/lia";
import { FaUserAltSlash } from "react-icons/fa";
import React from "react";
import Button from "./Button";
import Link from "next/link";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className, title }) => {
  const router = useRouter();

  const handlelogout = () => {
    // Remove the API key from local storage and redirect to the login page
    localStorage.removeItem("authToken");
    router.push("/");
  };

  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-slate-800 p-6`, className)}>
      <div className={twMerge(`flex justify-between gap-x-4 items-center`)}>
        <div>
          {title && <h1 className={twMerge(`
          text-slate-300 
          text-4xl 
          space-x-4
          font-bold
          uppercase 
          bg-gradient-to-r 
          from-sky-800 via-sky-500 to-sky-200  
          bg-clip-text 
          text-transparent`)}>{title}</h1>}
        </div>
        <div className={twMerge(`flex items-center gap-x-4`)}>
          <div className={twMerge(`flex-col justify-start gap-x-4`)}>
            <Link href="/homepage">
              <button
                className={twMerge(`
                  border-2 md:hidden justify-center bg-slate-400 rounded-full flex p-2 hover:opacity-75 transition
                  `)}
              >
                <HiHome className={twMerge(`text-black`)} size={30} />
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
                <LiaDiceD6Solid className={twMerge(`text-black`)} size={30} />
              </button>
            </Link>
          </div>
          <div className={twMerge(`flex-col justify-start gap-x-4`)}>
            <Link href="/homepage/similar-spotinite">
              <button
                className={twMerge(`
                  border-2 md:hidden justify-center bg-slate-400 rounded-full flex p-2 hover:opacity-75 transition
                `)}
              >
                <BiDice3 className={twMerge(`text-black`)} size={30} />
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
                <BiHeadphone className={twMerge(`text-black`)} size={30} />
              </button>
            </Link>
          </div>
          <div className={twMerge(`flex-col justify-start gap-x-4`)}>
            <Link href="/homepage/user-favorites">
              <button
                className={twMerge(`
                  border-2  md:hidden justify-center bg-slate-400 rounded-full flex p-2 hover:opacity-75 transition
                  `)}
              >
                <MdFavorite className={twMerge(`text-black`)} size={30} />
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
