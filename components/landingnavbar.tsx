"use client";

import { Montserrat } from "next/font/google";

import Link from "next/link";





const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const Landingnavbar = () => {
    // const { handlelogout } = useAuth();


  return (
    <nav className="p-7 bg-transparent flex items-center justify-center ">

        <Link href="/" className={"flex"}>
            <div className="">
                </div>
        </Link>
    </nav>
    );
}
export default Landingnavbar;