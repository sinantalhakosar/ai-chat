"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import { useMemo, useState } from "react";
import { ChatType } from "@/types/Common.types";
import { Chat } from "@/components/chat/Chat";
import { Input } from "@/components/ui/Input";
import { Plus, Search } from "lucide-react";
import { createChat } from "@/utils/api/createChat";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/Button";
import { updateChatName } from "@/utils/api/updateChatName";
import { deleteChat } from "@/utils/api/deleteChat";
import { useChatList } from "@/hooks/useChatList";

interface Props {
  onChatClick: () => void;
}

export const ChatList = ({ onChatClick }: Props) => {
  const { toast } = useToast();

  const { selectedProvider, selectedChatId, setSelectedChatId } =
    useDashboard();

  const { chatList, loading, setChatList, getChatList } = useChatList({
    selectedProvider,
    selectedChatId,
  });

  const [search, setSearch] = useState("");

  const filteredChatList = useMemo(() => {
    return chatList.filter((chat) =>
      (chat.name?.toLowerCase() ?? "").includes(search.toLowerCase())
    );
  }, [chatList, search]);

  const handleChatClick = (chatId: ChatType["id"]) => {
    setSelectedChatId(chatId);
    onChatClick();
  };

  const handleNewChatClick = async () => {
    try {
      const data = await createChat(selectedProvider);
      setChatList((prevList) => [data, ...prevList]);
      setSelectedChatId(data.id);
    } catch (error) {
      toast({
        title: "Error creating new chat",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleChatNameChange = async (
    chatId: ChatType["id"],
    editingName: string
  ) => {
    try {
      await updateChatName(chatId, editingName);
      await getChatList(selectedProvider);

      toast({
        title: "Chat name updated",
        description: "Chat name updated successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error updating chat name",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleChatDelete = async (chatId: ChatType["id"]) => {
    try {
      await deleteChat(chatId);
      await getChatList(selectedProvider);

      setSelectedChatId(null);
      toast({
        title: "Chat deleted",
        description: "Chat deleted successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error deleting chat",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-scroll px-4 py-4 gap-2 bg-[#202020] rounded-2xl">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search chats..."
          className="w-full dark:bg-[#4C4C4C] rounded-lg h-10 pl-10 dark:placeholder:text-[#BDBDBD]" // Added left padding for the icon
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="flex flex-col gap-2 overflow-y-scroll">
        {loading ? (
          <h1>Loading...</h1>
        ) : filteredChatList.length > 0 ? (
          filteredChatList.map((chat) => (
            <Chat
              key={chat.id}
              id={chat.id}
              name={chat.name ?? "Untitled"}
              onClick={handleChatClick}
              active={chat.id === selectedChatId}
              onEdit={(name) => handleChatNameChange(chat.id, name)}
              onDelete={() => handleChatDelete(chat.id)}
            />
          ))
        ) : (
          <h2 className="mt-2">No results</h2>
        )}
      </div>

      <Button
        className="mt-auto flex items-center gap-2 justify-between dark:bg-slate-700"
        onClick={handleNewChatClick}
      >
        New chat <Plus className="text-white rounded-md" />
      </Button>
    </div>
  );
};
