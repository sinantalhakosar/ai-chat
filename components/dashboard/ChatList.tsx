"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  const [search, setSearch] = useState("");

  const filteredChatList = useMemo(() => {
    return chatList.filter((chat) =>
      (chat.name?.toLowerCase() ?? "").includes(search.toLowerCase())
    );
  }, [chatList, search]);

  const getChatList = useCallback(
    async (selectedProvider: Provider) => {
      try {
        const data = await fetchChatList(selectedProvider);
        setChatList(data);
      } catch (error) {
        console.error("Error loading chat list:", error);
        toast({
          title: "Error loading chat list",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  // the reason of 2 useEffect is that, only when we select different provider, we need to show loading due to UX
  useEffect(() => {
    setLoading(true);
    getChatList(selectedProvider).finally(() => {
      setLoading(false);
    });
  }, [getChatList, selectedProvider]);

  useEffect(() => {
    if (selectedChatId) {
      getChatList(selectedProvider);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getChatList, selectedChatId]);

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
    <div className="flex flex-col h-full overflow-y-scroll px-4 py-4 gap-2">
      <div className="px-4 flex justify-between items-center">
        <h1>Chat list</h1>
        <IconButton icon={SquarePen} onClick={handleNewChatClick} />
      </div>

      <div className="mb-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search chats..."
            className="w-full dark:bg-[#303236] rounded-2xl h-14 pl-10 dark:placeholder:text-[#BDBDBD]" // Added left padding for the icon
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {loading ? (
          <h1>Loading...</h1>
        ) : filteredChatList.length > 0 ? (
          filteredChatList.map((chat) => (
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
