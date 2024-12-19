import { ReactNode } from "react";
import Aside from "./aside";
import MobileSidebar from "./mobile-sidebar";
import { getAuth } from "@/auth";
import MainContainer from "../common/main";
import ToggleSidebarButton from "./navbar/toggle-sidebar-button";
import { Input } from "../ui/input";



const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getAuth();


  return (
    <MainContainer classes="flex">
      <Aside />
      <div className="p-2 w-full">
        <nav className="flex items-center justify-between mb-4 p-1">
          <div className="flex items-center gap-3">
            <MobileSidebar />
            <ToggleSidebarButton />
            <h4 className="text-xl font-semibold">
              Hello {session?.user?.name || "User"}!
            </h4>
          </div>

          <div className="flex items-center gap-3">
            <Input type="search" placeholder="Search invoices..."/>
          </div>
        </nav>

        <div className="">{children}</div>
      </div>
    </MainContainer>
  );
};

export default DashboardLayout;
