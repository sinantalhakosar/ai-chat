"use client";

import { ChatList } from "@/components/chat/ChatList";
import { DashboardProvider } from "@/contexts/DashboardContext";
import Conversation from "@/components/conversation/Conversation";
import { User } from "@supabase/supabase-js";
import { ProviderSelect } from "@/components/ProviderSelect";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { cn } from "@/lib/utils";

interface Props {
  userEmail: User["email"];
}

export const Dashboard = ({ userEmail }: Props) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !isDesktop &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    // to not call this function on desktop
    if (!isDesktop) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (!isDesktop) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [isDesktop]);

  return (
    <DashboardProvider>
      <div className="p-4 h-full w-full flex sm:gap-4 relative">
        <div className={isSidebarOpen ? "w-1/3" : ""}>
          {/* For mobile */}
          {!isSidebarOpen && (
            <button
              className="md:hidden absolute top-4 left-4 z-20"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu />
            </button>
          )}

          <div
            ref={sidebarRef}
            className={cn(
              isSidebarOpen ? "translate-x-0" : "-translate-x-full",
              `flex flex-col gap-3
              fixed md:static top-0 left-0 h-full
              transition-transform duration-300 ease-in-out
              md:transform-none
              md:bg-transparent z-10 md:z-auto
              p-4 md:p-0`
            )}
          >
            <ProviderSelect />
            <ChatList onChatClick={() => setIsSidebarOpen(false)} />
          </div>
        </div>
        <Conversation userEmail={userEmail} />
      </div>
    </DashboardProvider>
  );
};
