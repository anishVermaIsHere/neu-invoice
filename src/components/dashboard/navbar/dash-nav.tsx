import React from "react";
import MobileSidebar from "../mobile-sidebar";
import ToggleSidebarButton from "./toggle-sidebar-button";
import { DuelDatePicker } from "../duel-date-picker";

const DashNavbar = ({ title }: { title: string }) => {
  return (
    <nav className="flex items-center justify-between mb-4 p-1">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <ToggleSidebarButton />
        <h4 className="flex items-center text-xl font-semibold text-gray-500">{title}</h4>
      </div>

      <DuelDatePicker />
    </nav>
  );
};

export default DashNavbar;
