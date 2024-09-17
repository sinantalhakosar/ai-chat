import { ChatType } from "@/types/Common.types";

export async function updateChatName(chatId: number, newName: string): Promise<ChatType> {
  try {
    const response = await fetch('/api/update-chat-name', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId, newName }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update chat name");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating chat name:", error);
    throw error;
  }
}