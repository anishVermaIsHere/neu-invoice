import { ReactNode } from "react";
import Aside from "./aside";
import MobileSidebar from "./mobile-sidebar";
import MainContainer from "../common/main";
import ToggleSidebarButton from "./navbar/toggle-sidebar-button";
import { redirect } from "next/navigation";
import SessionProvider from "../sesion-provider";
import { User } from "@prisma/client";
import { getAuth } from "@/auth";
import { AlertModal } from "../invoice/alert-modal";



const DashboardLayout = async ({ children }: { children: ReactNode }) => {

  const user = (await getAuth())?.user as User;

  if(!user) redirect('/login')
  if (!user?.firstName || !user?.lastName || !user?.address) redirect("/onboarding");


  return (
    <MainContainer classes="flex">
      <SessionProvider sessionUser={user}/>
      <Aside />
      <div className="p-2 w-full">
        <nav className="flex items-center justify-between mb-4 p-1">
          <div className="flex items-center gap-3">
            <MobileSidebar />
            <ToggleSidebarButton />
            <h4 className="text-xl font-semibold">
              Hello {user?.firstName || "User"}!
            </h4>
          </div>
        </nav>

        <div className="">{children}</div>
      </div>
      <AlertModal />
    </MainContainer>
  );
};

export default DashboardLayout;
