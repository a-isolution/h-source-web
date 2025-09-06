import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import SearchBar from "./search";
import { UserProfile } from "./user-profile";
import { NotificationBell } from "./notification-bell";

interface TopbarProps {
  onOpenMenu: () => void;
  isSidebarOpen: boolean;
  sidebarWidth: number; // in px
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenMenu,
  isSidebarOpen,
  sidebarWidth,
}) => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    // Run only on client
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const left =
    windowWidth && windowWidth >= 768 && isSidebarOpen ? sidebarWidth : 0;

  const width =
    windowWidth && windowWidth >= 768 && isSidebarOpen
      ? `calc(100% - ${sidebarWidth}px)`
      : "100%";

  return (
    <header
      className="fixed top-0 left-0 right-0 h-16 border-b border-stone-100 flex items-center justify-between px-4 py-3 bg-white z-40 transition-all duration-300"
      style={{ left, width }}
    >
      {/* Mobile Menu Toggle */}
      <div className="md:hidden z-10">
        <button onClick={onOpenMenu}>
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      <div className="w-full md:mx-auto px-4 md:pl-32 max-w-full md:w-[400px] lg:w-[600px]">
        <SearchBar />
      </div>

      <div className="flex items-center gap-8 z-10 ml-auto">
        <NotificationBell count={5} />
        <UserProfile />
      </div>
    </header>
  );
};
