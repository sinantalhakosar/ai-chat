import { Database } from "@/database.types";

export type Provider = Database["public"]["Enums"]["providers"];

export type ChatType = Database["public"]["Tables"]["chats"]["Row"];

export type MessageType = {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
};

export const availableProviders: Array<Provider> = ["openAI", "google"];

// OpenAIChatModelId is not exported from @ai-sdk/openai, so we need to define it ourselves
export type OpenAIModel =
  | "o1-preview"
  | "o1-mini"
  | "gpt-4o"
  | "gpt-4o-2024-05-13"
  | "gpt-4o-2024-08-06"
  | "gpt-4o-mini"
  | "gpt-4o-mini-2024-07-18"
  | "gpt-4-turbo"
  | "gpt-4-turbo-2024-04-09"
  | "gpt-4-turbo-preview"
  | "gpt-4-0125-preview"
  | "gpt-4-1106-preview"
  | "gpt-4"
  | "gpt-4-0613"
  | "gpt-3.5-turbo-0125"
  | "gpt-3.5-turbo"
  | "gpt-3.5-turbo-1106";

// GoogleModel is not exported from @ai-sdk/google, so we need to define it ourselves
export type GoogleModel =
  | "gemini-1.5-flash-latest"
  | "gemini-1.5-flash"
  | "gemini-1.5-pro-latest"
  | "gemini-1.5-pro"
  | "gemini-1.0-pro"
  | "gemini-pro";

export type Model = OpenAIModel | GoogleModel;

export const availableOpenAIModels: Array<OpenAIModel> = [
  "o1-preview",
  "o1-mini",
  "gpt-4o",
  "gpt-4o-2024-05-13",
  "gpt-4o-2024-08-06",
  "gpt-4o-mini",
  "gpt-4o-mini-2024-07-18",
  "gpt-4-turbo",
  "gpt-4-turbo-2024-04-09",
  "gpt-4-turbo-preview",
  "gpt-4-0125-preview",
  "gpt-4-1106-preview",
  "gpt-4",
  "gpt-4-0613",
  "gpt-3.5-turbo-0125",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-1106",
];

export const availableGoogleModels: Array<GoogleModel> = [
  "gemini-1.5-flash-latest",
  "gemini-1.5-flash",
  "gemini-1.5-pro-latest",
  "gemini-1.5-pro",
  "gemini-1.0-pro",
  "gemini-pro",
];
