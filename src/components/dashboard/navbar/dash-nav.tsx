import MobileSidebar from "../mobile-sidebar";
import ToggleSidebarButton from "./toggle-sidebar-button";
import { DuelDatePicker } from "../duel-date-picker";
import BackButton from "@/components/common/back-button";

const DashNavbar = ({
  title,
  isDatePicker = true,
  isBack = false,
}: {
  title: string;
  isDatePicker?: boolean;
  isBack?: boolean;

}) => {
  return (
    <nav className="flex items-center justify-between mb-4 p-1">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <ToggleSidebarButton />
        <h4 className="flex items-center text-xl font-semibold text-gray-500">
          {title}
        </h4>
      </div>
      {isDatePicker && <DuelDatePicker />}
      {isBack && <BackButton />}
    </nav>
  );
};

export default DashNavbar;
