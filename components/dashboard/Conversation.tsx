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
    <div className="flex flex-col w-full max-w-md py-24 mx-auto">
      <div className="mb-4">
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
      <form onSubmit={handleSubmit}>
        <input
          className="w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
