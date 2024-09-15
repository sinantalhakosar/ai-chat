"use client";

import { createClient } from "@/utils/supabase/client";
import { useDashboard } from "../../contexts/DashboardContext";
import { useCallback, useEffect, useState } from "react";
import { ChatType, Provider } from "@/types/Common.types";
import { Chat } from "./Chat";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export const ChatList = () => {
  const supabase = createClient();
  const { selectedProvider, selectedChatId, setSelectedChatId } =
    useDashboard();

  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState<Array<ChatType>>([]);

  const getChatList = useCallback(
    async (selectedProvider: Provider) => {
      try {
        setLoading(true);

        const { data, error, status } = await supabase
          .from("chats")
          .select("*")
          .eq("provider", selectedProvider)
          .order("created_at", { ascending: false })
          .returns<Array<ChatType>>();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setChatList(data);
        }
      } catch (error) {
        alert("Error loading user data!");
      } finally {
        setLoading(false);
      }
    },
    [supabase]
  );

  useEffect(() => {
    getChatList(selectedProvider);
  }, [getChatList, selectedProvider]);

  const handleChatClick = (chatId: ChatType["id"]) => {
    setSelectedChatId(chatId);
  };

  return (
    <div className="flex flex-col h-full overflow-y-scroll p-6 w-1/3">
      <div className="mb-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search chats..."
            className="w-full dark:bg-[#2f333c] rounded-2xl h-14 pl-10" // Added left padding for the icon
            onChange={(e) => {}}
          />
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {chatList.map((chat) => (
          <Chat
            key={chat.id}
            chat={chat}
            onClick={handleChatClick}
            active={chat.id === selectedChatId}
          />
        ))}
      </div>
    </div>
  );
};
