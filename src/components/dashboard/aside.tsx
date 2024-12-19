"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardConsts, SidebarLinksType } from "@/shared/data";
import { cn } from "@/lib/utils";
import useAppStore from "@/store/app.store";
import { UserMenu } from "./navbar/usermenu";


const Aside = () => {
  const pathName = usePathname();
  const { isSidebar } = useAppStore((state) => state);
  const isCurrentPath = (path: string) => pathName === path

  return (
    isSidebar && (
      <aside className="hidden md:flex p-2 flex-col justify-between min-w-[250px] max-w-[300px] min-h-screen border-r">
        <div className="flex items-center py-2">
          <Link href="/" className="mx-auto">
            <Image src="/neu-invoice.png" alt="logo" width={120} height={100} />
          </Link>
        </div>
        <div className="flex flex-col h-full">
          <ul className="p-1 flex flex-col">
            {dashboardConsts.sidebarLinks.map((link: SidebarLinksType) => (
              <li key={link.id} className="flex items-center">
              <Link
                href={link.link}
                className={cn(
                  isCurrentPath(link.link)
                    ? "border-l-8 border-indigo-500 text-indigo-500 font-semibold"
                    : "text-muted-foreground hover:text-foreground",
                  "py-2 px-3 flex items-center gap-3 hover:text-primary cursor-pointer w-full"
                )}
              >
                <div>
                  <link.icon className="size-5" />
                </div>
                {link.label}
              </Link>
            </li>
            ))}
          </ul>
        </div>

        <div className="p-2">
          <hr className="my-2" />
          <UserMenu />
        </div>
      </aside>
    )
  );
};

export default Aside;
