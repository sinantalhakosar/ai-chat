"use client";

import { useChat } from "ai/react";
import { useDashboard } from "../../contexts/DashboardContext";
import {
  availableAnthropicModels,
  availableGoogleModels,
  availableOpenAIModels,
  MessageType,
} from "@/types/Common.types";
import { Textarea } from "../ui/textarea";
import { IconButton } from "../ui/iconButton";
import { SendIcon } from "lucide-react";
import { ConversationInfoTab } from "./ConversationInfoTab";
import { ConversationBubble } from "./ConversationBubble";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { getProviderModalList } from "@/utils/getProviderModalList";

export default function Conversation() {
  const { selectedChatId, selectedProvider, setSelectedModel, selectedModel } =
    useDashboard();

  const modelListBasedOnProvider = getProviderModalList(selectedProvider);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    body: {
      model: selectedModel,
    },
    initialMessages: [
      {
        id: "welcome-message",
        role: "assistant",
        content: `Hello! I'm using the ${selectedModel} model. How can I assist you today? \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. `,
      },
      {
        id: "welcome-message-user",
        role: "user",
        content: `Hello there! Nice to meet you! Let's start the conversation! \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      },
    ],
  });

  const [chatMessages, setChatMessages] = useState<Array<MessageType>>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChatId) {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .eq("chat_id", selectedChatId)
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error fetching messages:", error);
        } else {
          setChatMessages(data || []);
        }
      }
    };

    fetchMessages();
  }, [selectedChatId]);

  // implement it in better place
  if (!selectedChatId) {
    return (
      <div className="flex flex-col w-3/4 p-2">
        No chat selected, new chat will appear here
      </div>
    );
  }

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
        {chatMessages.map((m) => (
          <ConversationBubble key={m.id} content={m.content} type={m.sender} />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-auto flex justify-center">
        <div className="relative w-3/4 mb-2">
          <div className="relative w-full">
            <div className="relative">
              <div className="relative">
                <Textarea
                  className="w-full pr-20 resize-none"
                  value={input}
                  placeholder="Say something..."
                  onChange={handleInputChange}
                />
                <div className="absolute bottom-2 right-2">
                  <IconButton type="submit" icon={SendIcon} size="sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
