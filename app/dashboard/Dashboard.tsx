"use client";

import { ChatList } from "@/components/dashboard/ChatList";
import { DashboardProvider } from "@/contexts/DashboardContext";
import ProviderList from "@/components/dashboard/ProviderList";
import Conversation from "@/components/dashboard/Conversation";
import { User } from "@supabase/supabase-js";
import { ProfileMenu } from "@/components/common/ProfileMenu";

export const Dashboard = ({ user }: { user: User }) => {
  return (
    <DashboardProvider>
      <div className="p-4 h-full w-full flex gap-4">
        <div className="w-20 h-full bg-[#303236] flex flex-col items-center justify-between rounded-3xl pt-4">
          <div>
            <ProviderList />
          </div>

          <div>
            <ProfileMenu user={user} />
          </div>
        </div>

        <div className="h-full bg-[#303236] flex flex-col items-center justify-between rounded-3xl">
          <ChatList />
        </div>

        <div className="w-full h-full bg-[#303236] flex flex-col items-center justify-between rounded-3xl">
          <Conversation />
        </div>
      </div>
    </DashboardProvider>
  );
};
