"use client";

import Link from "next/link";
import Button from "./Button";

export const Landinghero = () => {
  const isSignedIn = false;

  return (
    <div className={"text-white font-bold py-36 text-center space-y-5"}>
      <div className={"text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold"}>
        <h1 className={"text-6xl font-bold text-white"}>La Meilleure Plateforme pour : </h1>
        <div
          className={"text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-600"}
        >
          <h2 className={"text-6xl font-bold"}>votre plus belle experience musicale</h2>
        </div>
      </div>

      <div className={"h-20"}></div>

      <div className={"text-sm md:text-xl font-light text-zinc-400 "}>
        La musique a portée de clic. <span className="inline sm:hidden">⬇️</span>
      </div>
      <div className={"flex justify-center h-full"}>
        <div className={"flex flex-col space-y-5"}>
          <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
            <Button className="px-10 py-5 text-center text-xl text-white bg-blue-400 hover:bg-blue-600 rounded">
              Sign In
            </Button>
          </Link>
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button className="px-10 py-5 text-center text-xl text-white bg-green-700 hover:bg-green-500 rounded">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
      <div className={"text-sm md:text-xl font-light text-zinc-400 "}>
        Pas de carte de crédit requise !
      </div>
    </div>
  );
};

export default Landinghero;
