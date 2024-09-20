import { Provider } from "@/types/Common.types";

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