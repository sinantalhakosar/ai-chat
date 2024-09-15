"use client";

import { useChat } from "ai/react";
import { useDashboard } from "../../contexts/DashboardContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  availableGoogleModels,
  availableOpenAIModels,
  Model,
} from "@/types/Common.types";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { IconButton } from "../ui/iconButton";
import { SendIcon } from "lucide-react";

export default function Conversation() {
  const { selectedChatId, selectedProvider, setSelectedModel, selectedModel } =
    useDashboard();

  const modelListBasedOnProvider =
    selectedProvider === "openAI"
      ? availableOpenAIModels
      : availableGoogleModels;

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    body: {
      model: selectedModel,
    },
    initialMessages: [
      {
        id: "welcome-message",
        role: "assistant",
        content: `Hello! I'm using the ${selectedModel} model. How can I assist you today?`,
      },
    ],
  });

  return (
    <div className="flex flex-col w-full m-2">
      <div className="mb-4 w-1/3 ml-auto mt-2">
        <Select
          onValueChange={(value) => {
            setSelectedModel(value as Model);
          }}
          value={selectedModel || ""}
        >
          <SelectTrigger className="w-full flex">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            {modelListBasedOnProvider.map((model) => (
              <SelectItem key={model} value={model}>
                <div className="w-full flex">{model}</div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="h-auto">
        <div>
          chatId: {selectedChatId}, provider: {selectedProvider}, model:{" "}
          {selectedModel}
        </div>
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === "user" ? "Human: " : "AI: "}
            {m.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-auto flex justify-center">
        <div className="relative w-3/4 mb-8">
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
