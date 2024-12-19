"use client";

import { Icons } from "@/components/ui/icons";
import useAppStore from "@/store/app.store";

const ToggleSidebarButton = () => {
  const { setIsSidebar } = useAppStore((state) => state);

  return (
    <span className="hidden md:block">
      <Icons.hambg className="size-6 text-gray-500 cursor-pointer" onClick={setIsSidebar}/>
    </span>
  );
};

export default ToggleSidebarButton;
