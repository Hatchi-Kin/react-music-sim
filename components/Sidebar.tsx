"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiHeadphone, BiDice5 } from "react-icons/bi";
import { LiaDiceD6Solid } from "react-icons/lia";
import Box from "@/components/Box";
import Sidebaritem from "@/components/Sidebaritem";
import Library from "@/components/Library";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname == "/homepage",
        href: "/homepage",
      },
      {
        icon: LiaDiceD6Solid,
        label: "Random Song",
        active: pathname === "/random-song",
        href: "/homepage/random-song",
      },
      {
        icon: BiHeadphone,
        label: "List all Artists",
        active: pathname === "/byartist",
        href: "/homepage/byartist",
      },
    ],
    [pathname]
  );
  return (
    <div className={"flex h-full"}>
      <div
        className={
          "hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2"
        }
      >
        <Box className={"flex flex-col gap-y-4 px-5 py-4 bg-[#111827]"}>
          {routes.map((item) => (
            <Sidebaritem key={item.label} {...item} />
          ))}
        </Box>
        <Box className={"overflow-y-auto h-full bg-[#111827]"}>
          <Library />
        </Box>
      </div>
      <main className={"flex-1 h-full overflow-y-auto py-2"}>{children}</main>
    </div>
  );
};

export default Sidebar;
