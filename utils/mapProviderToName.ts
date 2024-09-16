import { Provider } from "@/types/Common.types";
import { Ban, Codesandbox, LucideIcon, ShellIcon } from "lucide-react";

export const mapProviderToName = (provider: Provider): string => {
  switch (provider) {
    case "openAI":
      return "OpenAI";
    case "google":
      return "Google";
    case "anthropic":
      return "Anthropic";
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
    case "anthropic":
      return "ANTHROPIC_API_KEY";
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
    case "anthropic":
      return Ban;
    default:
      return Ban;
  }
};

export const getProviderImage = (provider: Provider): string => {
  switch (provider) {
    case "openAI":
      return "/images/openai.svg";
    case "google":
      return "/images/gemini.svg";
    case "anthropic":
      return "/images/anthropic.svg";
  }
};
