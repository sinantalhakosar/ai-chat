import { Provider } from "@/types/Common.types";

export const getProviderLogo = (provider: Provider, dark?:boolean): string => {
    switch (provider) {
      case "openAI":
        return `/images/openai${dark ? "-dark" : ""}.svg`;
      case "google":
        return `/images/gemini${dark ? "-dark" : ""}.svg`;
      case "anthropic":
        return `/images/anthropic${dark ? "-dark" : ""}.svg`;
      default:
        return "";
    }
  };