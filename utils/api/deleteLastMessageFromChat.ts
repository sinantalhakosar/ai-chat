import { Provider } from "@/types/Common.types";

export async function deleteLastMessageFromChat(
  chatId: number,
  selectedProvider: Provider
): Promise<boolean> {
  try {
    const response = await fetch(`/api/delete-last-message-from-chat?chatId=${chatId}&provider=${selectedProvider}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete last message");
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error deleting last message:", error);
    throw error;
  }
}