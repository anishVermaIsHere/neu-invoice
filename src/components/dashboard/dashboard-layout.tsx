import { ReactNode } from "react";
import Aside from "./aside";
import MobileSidebar from "./mobile-sidebar";
import { getAuth } from "@/auth";
import MainContainer from "../common/main";
import ToggleSidebarButton from "./navbar/toggle-sidebar-button";
import { Input } from "../ui/input";
import { findUser } from "@/lib/prisma/utils";
import { redirect } from "next/navigation";
import SessionProvider from "../sesion-provider";



const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getAuth();
  const user = await findUser(session?.user?.id as string);

  if(!user) redirect('/login')
  if (!user?.firstName || !user.lastName || !user.address) redirect("/onboarding");


  return (
    <MainContainer classes="flex">
      <SessionProvider session={session}/>
      <Aside />
      <div className="p-2 w-full">
        <nav className="flex items-center justify-between mb-4 p-1">
          <div className="flex items-center gap-3">
            <MobileSidebar />
            <ToggleSidebarButton />
            <h4 className="text-xl font-semibold">
              Hello {session?.user?.firstName || "User"}!
            </h4>
          </div>

          <div className="flex items-center gap-3">
            <Input type="search" className="w-full sm:w-[350px]" placeholder="Search invoices..."/>
          </div>
        </nav>

        <div className="">{children}</div>
      </div>
    </MainContainer>
  );
};

export default DashboardLayout;
