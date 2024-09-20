import { Provider } from "@/types/Common.types";

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
