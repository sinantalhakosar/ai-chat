import { MessageType } from "@/types/Common.types";

export async function fetchMessages(chatId: number | null): Promise<{messages: Array<MessageType>, chatSummary: string}> {
  try {
    if (chatId === null) {
      return {messages: [], chatSummary: ""};
    }

    const response = await fetch(`/api/fetch-messages?chatId=${chatId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch messages");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}