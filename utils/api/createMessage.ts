import { MessageType } from "@/types/Common.types";

export async function createMessage(chatId: number, content: string, sender: string): Promise<MessageType> {
  try {
    const response = await fetch('/api/create-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId, content, sender }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create new message");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating new message:", error);
    throw error;
  }
}