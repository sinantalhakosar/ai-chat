"use client";

import { Message, useChat } from "ai/react";
import { useDashboard } from "../../contexts/DashboardContext";
import { Textarea } from "../ui/textarea";
import { IconButton } from "../ui/iconButton";
import { SendIcon } from "lucide-react";
import { ConversationInfoTab } from "./ConversationInfoTab";
import { ConversationBubble } from "./ConversationBubble";
import { FormEvent, useEffect } from "react";
import { getProviderModalList } from "@/utils/getProviderModalList";
import { fetchMessages } from "@/utils/supabase/fetchMessages";
import { createMessage } from "@/utils/supabase/createMessage";
import { createChat } from "@/utils/supabase/createChat";

export default function Conversation() {
  const {
    selectedChatId,
    setSelectedChatId,
    selectedProvider,
    setSelectedModel,
    selectedModel,
  } = useDashboard();

  const modelListBasedOnProvider = getProviderModalList(selectedProvider);

  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      api: "/api/chat",
      body: {
        model: selectedModel,
      },
    });

  useEffect(() => {
    const loadMessages = async () => {
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
  }, [selectedChatId, setMessages]);

  const handleMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim() === "") {
      return;
    }

    let chatId = selectedChatId;
    if (!chatId) {
      const data = await createChat(selectedProvider);
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
        {messages.map((m) => (
          <ConversationBubble key={m.id} content={m.content} type={m.role} />
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
                      if (input.trim() !== "") {
                        handleMessageSubmit(
                          e as unknown as FormEvent<HTMLFormElement>
                        );
                      }
                    }
                  }}
                />
                <div className="absolute bottom-2 right-2">
                  <IconButton
                    type="submit"
                    icon={SendIcon}
                    size="sm"
                    disabled={input.trim() === ""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
