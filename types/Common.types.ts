import { Database } from "@/database.types";
import { AnthropicModel, GoogleModel, OpenAIModel } from "@/types/Model.types";

export type Provider = Database["public"]["Enums"]["providers"];

export type ChatType = Database["public"]["Tables"]["chats"]["Row"];

export type MessageType = Database["public"]["Tables"]["messages"]["Row"];

export type Model = OpenAIModel | GoogleModel | AnthropicModel;
