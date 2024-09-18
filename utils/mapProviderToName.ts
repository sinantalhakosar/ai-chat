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

export const getProviderLogo = (provider: Provider, dark?:boolean): string => {
  switch (provider) {
    case "openAI":
      return `/images/openai${dark ? "-dark" : ""}.svg`;
    case "google":
      return `/images/gemini${dark ? "-dark" : ""}.svg`;
    case "anthropic":
      return `/images/anthropic${dark ? "-dark" : ""}.svg`;
  }
};
