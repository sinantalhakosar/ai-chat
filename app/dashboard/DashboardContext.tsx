import React, { createContext, useContext, useState, ReactNode } from "react";
import { ChatType, Model, Provider } from "@/types/Common.types";

interface DashboardContextType {
  selectedProvider: Provider;
  setSelectedProvider: (provider: Provider) => void;
  selectedModel: Model | null;
  setSelectedModel: (model: Model) => void;
  selectedChatId: ChatType["id"] | null;
  setSelectedChatId: (chatId: ChatType["id"]) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [selectedProvider, setSelectedProvider] = useState<Provider>("openAI");
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<ChatType["id"] | null>(
    null
  );

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
