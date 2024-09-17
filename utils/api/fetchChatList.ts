import { ChatType, Provider } from "@/types/Common.types";

export async function fetchChatList(
  selectedProvider: Provider
): Promise<Array<ChatType>> {
  try {
    const response = await fetch(`/api/fetch-chat-list?provider=${selectedProvider}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch chat list");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching chat list:", error);
    throw error;
  }
}