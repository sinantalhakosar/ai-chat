"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import { useCallback, useEffect, useState } from "react";
import { ChatType, Provider } from "@/types/Common.types";
import { Chat } from "@/components/dashboard/Chat";
import { Input } from "@/components/ui/Input";
import { Search, SquarePen } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { fetchChatList } from "@/utils/api/fetchChatList";
import { createChat } from "@/utils/api/createChat";
import { useToast } from "@/hooks/useToast";
import { times } from "lodash";
import { Skeleton } from "@/components/ui/Skeleton";

export const ChatList = () => {
  const { toast } = useToast();

  const { selectedProvider, selectedChatId, setSelectedChatId } =
    useDashboard();

  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState<Array<ChatType>>([]);

  const getChatList = useCallback(
    async (selectedProvider: Provider) => {
      try {
        setLoading(true);

        const data = await fetchChatList(selectedProvider);
        setChatList(data);
      } catch (error) {
        console.error("Error loading chat list:", error);
        toast({
          title: "Error loading chat list",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  useEffect(() => {
    getChatList(selectedProvider);
  }, [getChatList, selectedProvider]);

  const handleChatClick = (chatId: ChatType["id"]) => {
    setSelectedChatId(chatId);
  };

  const handleNewChatClick = async () => {
    try {
      const data = await createChat(selectedProvider);
      setChatList((prevList) => [data, ...prevList]);
      setSelectedChatId(data.id);
    } catch (error) {
      console.error("Error creating new chat:", error);
      alert("Failed to create new chat");
    }
  };

  const handleChatNameChange = async () => {
    await getChatList(selectedProvider);
  };

  return (
    <div className="flex flex-col h-full overflow-y-scroll px-6 py-4 w-1/4 gap-2 border-r border-r-foreground/10">
      <div className="px-2 flex justify-between items-center">
        <h1>Chat list</h1>
        <IconButton icon={SquarePen} onClick={handleNewChatClick} />
      </div>

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
        {loading ? (
          times(6).map((index) => (
            <Skeleton
              key={index}
              className="w-full h-[50px] rounded-full bg-[#2f333c]"
            />
          ))
        ) : chatList.length > 0 ? (
          chatList.map((chat) => (
            <Chat
              key={chat.id}
              chat={chat}
              onClick={handleChatClick}
              active={chat.id === selectedChatId}
              onNameChange={handleChatNameChange}
            />
          ))
        ) : (
          <h2>No chat history found</h2>
        )}
      </div>
    </div>
  );
};
