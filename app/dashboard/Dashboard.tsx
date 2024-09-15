"use client";

import { ChatList } from "./ChatList";
import { DashboardProvider } from "./DashboardContext";
import ProviderList from "./ProviderList";
import Conversation from "./Conversation";

export const Dashboard = () => {
  return (
    <DashboardProvider>
      <div className="flex gap-4 justify-between w-full h-full">
        <div className="w-auto">
          <ProviderList />
        </div>
        <div className="flex-grow bg-[#202328] rounded-3xl flex gap-4">
          <ChatList />
          <Conversation />
        </div>
      </div>
    </DashboardProvider>
  );
};
