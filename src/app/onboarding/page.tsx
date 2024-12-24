import { getAuth } from "@/auth";
import Layout from "@/components/common/layout";
import OnboardForm from "@/components/onboard-form";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";


const OnboardingPage = async () => {

  const session = await getAuth();
  const user = session?.user as User;

  if(!user){
    return redirect('/login');
  }
  if(session?.user && (user?.firstName && user?.lastName && user?.email)){
    return redirect('/dashboard');
  }

  return (
    <Layout><OnboardForm /></Layout>
  );
};

export default OnboardingPage;
