"use client";

import { Message, useChat } from "ai/react";
import { useDashboard } from "@/contexts/DashboardContext";
import { Textarea } from "@/components/ui/Textarea";
import { IconButton } from "@/components/ui/IconButton";
import {
  Copy,
  KeyRound,
  RefreshCcw,
  Send,
  SendIcon,
  Square,
} from "lucide-react";
import { ConversationInfoTab } from "@/components/dashboard/ConversationInfoTab";
import { ConversationBubble } from "@/components/dashboard/ConversationBubble";
import { FormEvent, useEffect, useState } from "react";
import { getProviderModalList } from "@/utils/getProviderModalList";
import { fetchMessages } from "@/utils/api/fetchMessages";
import { createMessage } from "@/utils/api/createMessage";
import { createChat } from "@/utils/api/createChat";
import { Skeleton } from "@/components/ui/Skeleton";
import { times } from "lodash";
import { deleteLastMessageFromChat } from "@/utils/api/deleteLastMessageFromChat";
import { useToast } from "@/hooks/useToast";
import { validateApiKey } from "@/utils/validateApiKey";
import { Button } from "@/components/ui/Button";
import { getProviderLogo, mapProviderToName } from "@/utils/mapProviderToName";
import Link from "next/link";
import { updateChatSummary } from "@/utils/supabase/updateChatSummary";
import { Input } from "../ui/Input";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { EmptyChat } from "./EmptyChat";
import { User } from "@supabase/supabase-js";

interface Props {
  userEmail: User['email'];
}

export default function Conversation({ userEmail }: Props) {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatSummary, setChatSummary] = useState("");

  // hack: to escape hydration error
  useEffect(() => {
    setMounted(true);
  }, []);

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
    setInput,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading: isResponseLoading,
    stop,
    error,
    reload,
  } = useChat({
    api: "/api/chat",
    initialInput: chatSummary,
    body: {
      model: selectedModel,
    },
    streamProtocol: "text",
    onFinish: async (message) => {
      if (selectedChatId) {
        await updateChatSummary(selectedChatId, messages);
        await createMessage(selectedChatId, message.content, "assistant");
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
      setLoading(false);
    };

    loadMessages();
  }, [selectedChatId, setMessages]);

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
        console.error("Error regenerating message:", error);
        toast({
          title: "Error",
          description: "Failed to regenerate message",
          variant: "destructive",
        });
      }
    }
  };

  if (!mounted) return <></>;

  if (!validKey) {
    return (
      <div className=" flex justify-center items-center w-full h-screen">
        <div className="bg-[#202020] w-full sm:w-3/4 rounded-2xl flex flex-col justify-center items-center gap-4 p-4">
          <KeyRound size={32} className="text-red-500" />

          <p className="text-slate-50 text-lg text-center">
            No valid API key found for {mapProviderToName(selectedProvider)}
          </p>

          <Link href="/dashboard/api-keys">
            <Button className="bg-slate-700 text-slate-50">
              Manage API Keys
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
      <ConversationInfoTab
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        modelList={modelListBasedOnProvider}
        userEmail={userEmail}
      />

      <div className="overflow-y-auto">
        {loading ? (
          times(8).map((i) => (
            <Skeleton
              key={i}
              className={`w-[400px] h-[50px] rounded-full bg-[#2f333c] ${i % 2 === 0 ? "ml-auto" : ""}`}
            />
          ))
        ) : messages.length === 0 ? (
          <EmptyChat />
        ) : (
          messages.map((m) => (
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
          ))
        )}
      </div>

      <form
        onSubmit={handleMessageSubmit}
        className={`mt-auto ${isDesktop ? "mb-3" : "mb-28"} flex flex-col items-center justify-center relative w-full`}
      >
        <div className="relative w-full">
          <div className="relative">
            <Image
              src={getProviderLogo(selectedProvider, true)}
              alt="AI Chat Assistant"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />

            <Input
              className="dark:bg-slate-100 text-black pl-10 pr-20 dark:placeholder:text-zinc-700"
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
          </div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex">
            {isResponseLoading ? (
              <IconButton
                type="button"
                icon={Square}
                size="sm"
                onClick={() => stop()}
                iconClassName="text-black"
              />
            ) : (
              <IconButton
                type="submit"
                icon={Send}
                size="sm"
                disabled={loading || error !== undefined}
                iconClassName="text-black"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
