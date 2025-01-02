import { ReactNode } from "react";
import Aside from "./aside";
import MainContainer from "../common/main";
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
    <MainContainer classes="flex h-screen">
      <SessionProvider sessionUser={user}/>
      <Aside />
      <div className="p-2 overflow-hidden overflow-y-auto h-screen w-full">
        <div>{children}</div>
      </div>
      <AlertModal />
    </MainContainer>
  );
};

export default DashboardLayout;
