"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { dashboardConsts } from "@/shared/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../ui/icons";
import { UserMenu } from "./navbar/usermenu";

const MobileSidebar = () => {
  const pathName = usePathname();
  const isCurrentPath = (path: string) => pathName === path;

  return (
    <Sheet>
      <SheetTrigger className="block md:hidden">
        <div className="cursor-pointer">
          <Icons.hambg className="text-indigo-500" />
        </div>
      </SheetTrigger>
      <SheetContent className="p-0 min-h-screen max-w-sm" side="left">
        <aside className="flex flex-col justify-between h-full">
          <div className="flex items-center py-2">
            <Link href="/" className="">
              <Image
                src="/neu-invoice.png"
                alt="logo"
                width={120}
                height={100}
              />
            </Link>
          </div>
          <div className="flex flex-col h-full">
            <ul className="p-1 flex flex-col gap-1">
              {dashboardConsts.sidebarLinks.map((link) => (
                <li key={link?.id} className="flex items-center">
                  <Link
                    href={link?.link}
                    className={cn(
                      isCurrentPath(link?.link)
                        ? "border-l-8 border-indigo-500 text-indigo-500 font-semibold"
                        : "text-muted-foreground hover:text-foreground",
                      "py-2 px-3 flex items-center gap-3 hover:text-primary cursor-pointer w-full"
                    )}
                  >
                    <div>
                      <link.icon className="size-5" />
                    </div>
                    {link?.label}
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
