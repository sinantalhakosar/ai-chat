import { Provider } from "@/types/Common.types";
import { Ban, Codesandbox, LucideIcon, ShellIcon } from "lucide-react";

export const mapProviderToName = (provider: Provider): string => {
  switch (provider) {
    case "openAI":
      return "OpenAI";
    case "google":
      return "Google";
    default:
      return "Unknown Provider";
  }
};

export const mapProviderToApiKeyName = (provider: Provider): string => {
  switch (provider) {
    case "openAI":
      return "OPENAI_API_KEY";
    case "google":
      return "GOOGLE_GENERATIVE_AI_API_KEY";
    default:
      return "Unknown Provider API Key";
  }
};

export const getProviderIcon = (provider: Provider): LucideIcon => {
  switch (provider) {
    case "openAI":
      return Codesandbox;
    case "google":
      return ShellIcon;
    default:
      return Ban;
  }
};
