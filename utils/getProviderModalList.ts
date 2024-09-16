import { availableAnthropicModels, availableGoogleModels, availableOpenAIModels, Provider } from "@/types/Common.types";

export function getProviderModalList(provider: Provider) {
  switch (provider) {
    case "openAI":
      return availableOpenAIModels;
    case "google":
      return availableGoogleModels;
    case "anthropic":
      return availableAnthropicModels;
    default:
      return [];
  }
}