import { useToast } from "@/hooks/useToast";
import { ChatType, Provider } from "@/types/Common.types";
import { fetchChatList } from "@/utils/api/fetchChatList";
import { useCallback, useEffect, useState } from "react";

interface ChatList {
  selectedProvider: Provider;
  selectedChatId: ChatType["id"] | null;
}

export function useChatList({
  selectedProvider,
  selectedChatId,
}: ChatList) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState<Array<ChatType>>([]);

  const getChatList = useCallback(
    async (selectedProvider: Provider) => {
      try {
        const data = await fetchChatList(selectedProvider);
        setChatList(data);
      } catch (error) {
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

  return {
    loading,
    setLoading,
    chatList,
    setChatList,
    getChatList,
  };
}
