"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiHeadphone, BiDice3 } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
import { LiaDiceD6Solid } from "react-icons/lia";
import Box from "@/components/Box";
import Sidebaritem from "@/components/Sidebaritem";
import MusicPlayer from "@/components/MusicPlayer";

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
        active: pathname === "/homepage/random-song",
        href: "/homepage/random-song",
      },
      {
        icon: BiDice3,
        label: "Cyanite API",
        active: pathname === "/homepage/similar-spotinite",
        href: "/homepage/similar-spotinite",
      },
      {
        icon: BiHeadphone,
        label: "List all Artists",
        active: pathname === "/homepage/byartist",
        href: "/homepage/byartist",
      },
      {
        icon: MdFavorite,
        label: "My Favourites",
        active: pathname === "/homepage/user-favorites",
        href: "/homepage/user-favorites",
      },
    ],
    [pathname]
  );
  return (
    <div className={"flex h-full"}>
      <div className={"hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2"}>
        <Box className={"flex flex-col gap-y-4 px-5 py-4 bg-[#111827]"}>
          {routes.map((item) => (
            <Sidebaritem key={item.label} {...item} />
          ))}
        </Box>
        <Box className={"overflow-y-auto h-full bg-[#111827]"}>
          <MusicPlayer />
        </Box>
      </div>
      <main className={"flex-1 h-full overflow-y-auto py-2"}>{children}</main>
    </div>
  );
};

export default Sidebar;
