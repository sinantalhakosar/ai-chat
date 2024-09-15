import React, { createContext, useContext, useState, ReactNode } from "react";
import { ChatType, OpenAIModel, Provider } from "@/types/Common.types";

interface DashboardContextType {
  selectedProvider: Provider;
  setSelectedProvider: (provider: Provider) => void;
  selectedModel: OpenAIModel | null;
  setSelectedModel: (model: OpenAIModel) => void;
  selectedChatId: ChatType['id'] | null;
  setSelectedChatId: (chatId: ChatType['id']) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [selectedProvider, setSelectedProvider] = useState<Provider>("openAI");
  const [selectedModel, setSelectedModel] = useState<OpenAIModel | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<ChatType['id'] | null>(null);

  return (
    <DashboardContext.Provider
      value={{
        selectedProvider,
        setSelectedProvider,
        selectedModel,
        setSelectedModel,
        selectedChatId,
        setSelectedChatId,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
