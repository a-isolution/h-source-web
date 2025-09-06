"use client";

import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import ProtectedLayout from "@/layouts/protected-layout";
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
}

const SIDEBAR_WIDTH_PX = 254;

const AppLayout = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProtectedLayout>
      <div className="flex h-screen w-full bg-gray-50">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 relative">
          <Topbar
            isSidebarOpen={isSidebarOpen}
            onOpenMenu={() => setIsSidebarOpen(true)}
            sidebarWidth={SIDEBAR_WIDTH_PX}
          />

          <main className="flex-1 overflow-auto p-4 bg-[#F9F9F9] mt-[60px] md:ml-[240px] lg:ml-[244px] ">
            {children}
          </main>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default AppLayout;
