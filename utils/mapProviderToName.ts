import { Provider } from "@/types/Common.types";
import { Ban, Codesandbox, LucideIcon, ShellIcon } from "lucide-react";

export const mapProviderToName = (provider: Provider): string => {
  switch (provider) {
    case 'openAI':
      return "OpenAI";
    case 'google':
      return "Google";
    default:
      return "Unknown Provider";
  }
};

export const getProviderIcon = (provider: Provider): LucideIcon => {
  switch (provider) {
    case 'openAI':
      return Codesandbox;
    case 'google':
      return ShellIcon;
    default:
      return Ban;
  }
};

