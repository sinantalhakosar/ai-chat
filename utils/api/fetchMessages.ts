import { MessageType } from "@/types/Common.types";

export async function fetchMessages(chatId: number | null): Promise<Array<MessageType>> {
  try {
    if (chatId === null) {
      return [];
    }

    const response = await fetch(`/api/fetch-messages?chatId=${chatId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch messages");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
}