"use client";

import { Message, useChat } from "ai/react";
import { useDashboard } from "@/contexts/DashboardContext";
import { ConversationInfoTab } from "@/components/conversation/ConversationInfoTab";
import { FormEvent, useEffect, useState } from "react";
import { getProviderModalList } from "@/utils/getProviderModalList";
import { fetchMessages } from "@/utils/api/fetchMessages";
import { createMessage } from "@/utils/api/createMessage";
import { createChat } from "@/utils/api/createChat";
import { deleteLastMessageFromChat } from "@/utils/api/deleteLastMessageFromChat";
import { useToast } from "@/hooks/useToast";
import { validateApiKey } from "@/utils/validateApiKey";
import { updateChatSummary } from "@/utils/supabase/updateChatSummary";
import { useMediaQuery } from "react-responsive";
import { User } from "@supabase/supabase-js";
import { NoValidApiKey } from "@/components/conversation/NoValidApiKey";
import { ConversationInputForm } from "@/components/conversation/ConversationInputForm";
import { ConversationMessages } from "@/components/conversation/ConversationMessages";

const chatApi = "/api/chat";

interface Props {
  userEmail: User["email"];
}

export default function Conversation({ userEmail }: Props) {
  const { toast } = useToast();
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const [loading, setLoading] = useState(false);
  const [chatSummary, setChatSummary] = useState("");

  const {
    selectedChatId,
    setSelectedChatId,
    selectedProvider,
    setSelectedModel,
    selectedModel,
  } = useDashboard();

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading: isResponseLoading,
    stop,
    error,
    reload,
  } = useChat({
    api: chatApi,
    initialInput: chatSummary,
    body: {
      model: selectedModel,
    },
    streamProtocol: "text",
    onFinish: async (message) => {
      if (selectedChatId) {
        try {
          await updateChatSummary(selectedChatId, messages);
          await createMessage(selectedChatId, message.content, "assistant");
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to update chat. Please try again.",
            variant: "destructive",
          });
        }
      }
    },
  });

  const validKey = validateApiKey(selectedProvider);
  const modelListBasedOnProvider = getProviderModalList(selectedProvider);

  useEffect(() => {
    // Clear the input when the provider changes
    setInput("");
  }, [selectedProvider, setInput]);

  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      try {
        if (!selectedChatId) {
          setMessages([]);
          setChatSummary("");
          return;
        }

        const { messages, chatSummary } = await fetchMessages(selectedChatId);

        const fetchedMessages = messages.map((m) => {
          const message: Message = {
            id: m.id.toString(),
            role: m.sender,
            content: m.content,
          };
          return message;
        });

        setMessages(fetchedMessages);
        setChatSummary(chatSummary);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load messages. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [selectedChatId, setMessages, toast]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim() === "") {
      return;
    }

    try {
      let chatId = selectedChatId;
      if (!chatId) {
        const data = await createChat(selectedProvider);
        setSelectedChatId(data.id);
        chatId = data.id;
      }

      await createMessage(chatId, input, "user");

      handleSubmit(e);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopyClick = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
      variant: "default",
    });
  };

  const handleRegenerateClick = async () => {
    if (selectedChatId) {
      try {
        const success = await deleteLastMessageFromChat(
          selectedChatId,
          selectedProvider
        );

        if (success) {
          reload();
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to regenerate message",
          variant: "destructive",
        });
      }
    }
  };

  if (!validKey) {
    return <NoValidApiKey />;
  }

  return (
    <div className="flex flex-col w-full h-full">
      <ConversationInfoTab
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        modelList={modelListBasedOnProvider}
        userEmail={userEmail}
      />

      <ConversationMessages
        messages={messages}
        loading={loading}
        isResponseLoading={isResponseLoading}
        handleRegenerateClick={handleRegenerateClick}
        handleCopyClick={handleCopyClick}
      />

      <ConversationInputForm
        handleMessageSubmit={handleMessageSubmit}
        isDesktop={isDesktop}
        selectedProvider={selectedProvider}
        input={input}
        handleInputChange={handleInputChange}
        isResponseLoading={isResponseLoading}
        loading={loading}
        error={error}
        stop={stop}
      />
    </div>
  );
}
