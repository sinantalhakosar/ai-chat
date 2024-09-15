"use client";

import { ChatList } from "../../components/dashboard/ChatList";
import { DashboardProvider } from "../../contexts/DashboardContext";
import ProviderList from "../../components/dashboard/ProviderList";
import Conversation from "../../components/dashboard/Conversation";

export const Dashboard = () => {
  return (
    <DashboardProvider>
      <div className="flex gap-4 justify-between w-full h-full">
        <div className="w-auto">
          <ProviderList />
        </div>
        <div className="flex-grow flex gap-4 w-full bg-[#202328] rounded-3xl">
          <ChatList />
          <Conversation />
        </div>
      </div>
    </DashboardProvider>
  );
};
