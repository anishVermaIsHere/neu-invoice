import DashboardLayout from "@/components/dashboard/dashboard-layout";
import DashCard from "@/components/dashboard/dashboard-card";
import { dashboardConsts } from "@/shared/data";
import { redirect } from "next/navigation";
import { getAuth } from "@/auth";

const DashboardPage = async () => {
  const session = await getAuth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <DashboardLayout user={session?.user}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dashboardConsts.cards.map((dcard) => (
          <DashCard key={dcard.id} {...dcard} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
