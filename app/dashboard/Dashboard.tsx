"use client";

import { ChatList } from "@/components/dashboard/ChatList";
import { DashboardProvider } from "@/contexts/DashboardContext";
import Conversation from "@/components/dashboard/Conversation";
import { User } from "@supabase/supabase-js";
import { ProviderSelect } from "@/components/dashboard/ProviderSelect";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  userEmail: User['email'];
}

export const Dashboard = ({ userEmail }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DashboardProvider>
      <div className="p-4 h-full w-full flex gap-4 relative">
        <div className={`${isSidebarOpen ? "w-1/3" : ""}`}>
          {/* Hamburger menu for mobile */}
          {!isSidebarOpen && (
            <button
              className="md:hidden absolute top-4 left-4 z-20"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu />
            </button>
          )}

          {/* Sidebar */}

          <div
            ref={sidebarRef}
            className={`
          flex flex-col gap-3
          fixed md:static top-0 left-0 h-full
          transition-transform duration-300 ease-in-out
          md:transform-none
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:bg-transparent z-10 md:z-auto
          p-4 md:p-0
        `}
          >
            <ProviderSelect />
            <ChatList onChatClick={() => setIsSidebarOpen(false)} />
          </div>
        </div>
        <Conversation userEmail={userEmail}/>
      </div>
    </DashboardProvider>
  );
};
