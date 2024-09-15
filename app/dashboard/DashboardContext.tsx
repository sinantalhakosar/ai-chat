import React, { createContext, useContext, useState, ReactNode } from "react";
import { OpenAIModel, Providers } from "@/types/Common.types";

interface DashboardContextType {
  selectedProvider: Providers;
  setSelectedProvider: (provider: Providers) => void;
  selectedModel: OpenAIModel | null;
  setSelectedModel: (model: OpenAIModel) => void;
  selectedChatId: string | null;
  setSelectedChatId: (chatId: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [selectedProvider, setSelectedProvider] = useState<Providers>("openAI");
  const [selectedModel, setSelectedModel] = useState<OpenAIModel | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

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
