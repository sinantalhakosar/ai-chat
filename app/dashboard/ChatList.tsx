"use client";

import { createClient } from "@/utils/supabase/client";
import { useDashboard } from "./DashboardContext";
import { useCallback, useEffect, useState } from "react";
import { ChatType, Provider } from "@/types/Common.types";
import { Chat } from "./Chat";

export const ChatList = () => {
  const supabase = createClient();
  const { selectedProvider, selectedChatId, setSelectedChatId } = useDashboard();

  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState<Array<ChatType>>([]);

  const getChatList = useCallback(async (selectedProvider: Provider) => {
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
  }, [supabase]);

  useEffect(() => {
    getChatList(selectedProvider);
  }, [getChatList, selectedProvider]);

  const handleChatClick = (chatId: ChatType["id"]) => {
    setSelectedChatId(chatId);
  };

  return (
    <div className="flex flex-col gap-1 h-full overflow-y-scroll my-2 p-2">
      {chatList.map((chat) => (
        <Chat key={chat.id} chat={chat} onClick={handleChatClick} active={chat.id === selectedChatId}/>
      ))}
    </div>
  );
};
