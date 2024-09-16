"use client";

import { Message, useChat } from "ai/react";
import { useDashboard } from "../../contexts/DashboardContext";
import { Textarea } from "../ui/textarea";
import { IconButton } from "../ui/iconButton";
import { SendIcon, Square, StopCircle } from "lucide-react";
import { ConversationInfoTab } from "./ConversationInfoTab";
import { ConversationBubble } from "./ConversationBubble";
import { FormEvent, useEffect, useState } from "react";
import { getProviderModalList } from "@/utils/getProviderModalList";
import { fetchMessages } from "@/utils/supabase/fetchMessages";
import { createMessage } from "@/utils/supabase/createMessage";
import { createChat } from "@/utils/supabase/createChat";
import { Skeleton } from "../ui/skeleton";
import { times } from "lodash";

export default function Conversation() {
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
  } = useChat({
    api: "/api/chat",
    body: {
      model: selectedModel,
    },
    streamProtocol: "text",
    onFinish: async (message, options) => {
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
              <ConversationBubble
                key={m.id}
                content={m.content}
                type={m.role}
                isTyping={m.role === 'assistant' && m.id === messages[messages.length - 1].id}
              />
            ))}
      </div>

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
                    <IconButton type="submit" icon={Square} size="sm" onClick={() => stop()}/>
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
