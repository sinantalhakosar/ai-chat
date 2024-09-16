"use client";

import { ChatList } from "../../components/dashboard/ChatList";
import { DashboardProvider } from "../../contexts/DashboardContext";
import ProviderList from "../../components/dashboard/ProviderList";
import Conversation from "../../components/dashboard/Conversation";
import { User } from "@supabase/supabase-js";
import { ProfileMenu } from "@/components/ProfileMenu";

export const Dashboard = ({ user }: { user: User }) => {
  return (
    <DashboardProvider>
      <div className="flex gap-4 justify-between w-full h-full">
        <div className="w-auto flex flex-col items-center mt-2 justify-center">
          <ProviderList />

          <div className="mt-auto mb-8 border-t border-r-foreground pt-12 w-full flex justify-center">
            <ProfileMenu user={user} />
          </div>
        </div>
        <div className="flex-grow flex gap-4 w-full bg-[#202328] rounded-l-3xl">
          <ChatList />
          <Conversation />
        </div>
      </div>
    </DashboardProvider>
  );
};
