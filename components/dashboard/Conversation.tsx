"use client";

import { Message, useChat } from "ai/react";
import { useDashboard } from "../../contexts/DashboardContext";
import { Textarea } from "../ui/textarea";
import { IconButton } from "../ui/iconButton";
import {
  Copy,
  MessageCircleWarning,
  RefreshCcw,
  SendIcon,
  Square,
} from "lucide-react";
import { ConversationInfoTab } from "./ConversationInfoTab";
import { ConversationBubble } from "./ConversationBubble";
import { FormEvent, useEffect, useState } from "react";
import { getProviderModalList } from "@/utils/getProviderModalList";
import { fetchMessages } from "@/utils/api/fetchMessages";
import { createMessage } from "@/utils/api/createMessage";
import { createChat } from "@/utils/api/createChat";
import { Skeleton } from "../ui/skeleton";
import { times } from "lodash";
import { deleteLastMessageFromChat } from "@/utils/api/deleteLastMessageFromChat";
import { useToast } from "@/hooks/use-toast";

export default function Conversation() {
  const { toast } = useToast();

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
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading: isResponseLoading,
    stop,
    error,
    reload,
  } = useChat({
    api: "/api/chat",
    body: {
      model: selectedModel,
    },
    streamProtocol: "text",
    onFinish: async (message) => {
      if (selectedChatId) {
        await createMessage(selectedChatId, message.content, "assistant");
      } else if (tempChatId) {
        await createMessage(tempChatId, message.content, "assistant");
      }
    },
  });

  let tempChatId = selectedChatId;
  const [loading, setLoading] = useState(false);

  const modelListBasedOnProvider = getProviderModalList(selectedProvider);

  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      const messages = await fetchMessages(selectedChatId);
      const fetchedMessages = messages.map((m) => {
        const message: Message = {
          id: m.id.toString(),
          role: m.sender,
          content: m.content,
        };
        return message;
      });

      setMessages(fetchedMessages);
    };

    loadMessages();
    setLoading(false);
  }, [selectedChatId, setMessages]);

  const handleMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim() === "") {
      return;
    }

    let chatId = selectedChatId;
    if (!chatId) {
      const data = await createChat(selectedProvider);
      tempChatId = data.id;
      setSelectedChatId(data.id);
      chatId = data.id;
    }

    await handleSubmit(e);

    const userMessage = input;
    await createMessage(chatId, userMessage, "user");
  };

  const handleCopyClick = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
      variant: "default",
    });
  };

  const handleRegenerateClick = async () => {
    if (selectedChatId) {
      try {
        const success = await deleteLastMessageFromChat(selectedChatId, selectedProvider);
        if (success) {
          reload();
        }
      } catch (error) {
        console.error("Error regenerating message:", error);
        toast({
          title: "Error",
          description: "Failed to regenerate message",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex flex-col w-full p-2">
      <ConversationInfoTab
        selectedProvider={selectedProvider}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        modelList={modelListBasedOnProvider}
      />

      <div
        className="h-auto overflow-y-auto"
        ref={(el) => {
          if (el) {
            el.scrollTop = el.scrollHeight;
          }
        }}
      >
        {loading
          ? times(8).map((i) => (
              <Skeleton
                key={i}
                className={`w-[400px] h-[50px] rounded-full bg-[#2f333c] ${i % 2 === 0 ? "ml-auto" : ""}`}
              />
            ))
          : messages.map((m) => (
              <div key={m.id} className="flex flex-col mb-4">
                <ConversationBubble
                  content={m.content}
                  type={m.role}
                  isTyping={
                    m.role === "assistant" &&
                    m.id === messages[messages.length - 1].id &&
                    isResponseLoading
                  }
                />
                {m.role === "assistant" && (
                  <div>
                    {m.id === messages[messages.length - 1].id && (
                      <IconButton
                        icon={RefreshCcw}
                        disableHover
                        onClick={handleRegenerateClick}
                      />
                    )}
                    <IconButton
                      icon={Copy}
                      disableHover
                      onClick={() => handleCopyClick(m.content)}
                    />
                  </div>
                )}
              </div>
            ))}
      </div>
      {/* bug: align bottom */}
      {error && (
        <div className="flex items-center justify-center mt-auto">
          <MessageCircleWarning className="w-4 h-4 mr-2 text-red-500" />
          <h1 className="text-red-500">{error.message}</h1>
        </div>
      )}

      <form
        onSubmit={(e) => handleMessageSubmit(e)}
        className="mt-auto flex justify-center"
      >
        <div className="relative w-3/4 mb-2">
          <div className="relative w-full">
            <div className="relative">
              <div className="relative">
                <Textarea
                  className="w-full pr-20 resize-none"
                  value={input}
                  placeholder="Say something..."
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();

                      handleMessageSubmit(
                        e as unknown as FormEvent<HTMLFormElement>
                      );
                    }
                  }}
                />
                <div className="absolute bottom-2 right-2">
                  {isResponseLoading ? (
                    <IconButton
                      type="submit"
                      icon={Square}
                      size="sm"
                      onClick={() => stop()}
                    />
                  ) : (
                    <IconButton
                      type="submit"
                      icon={SendIcon}
                      size="sm"
                      disabled={loading}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
