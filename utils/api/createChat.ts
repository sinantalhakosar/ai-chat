import { ChatType, Provider } from "@/types/Common.types";

export async function createChat(selectedProvider: Provider): Promise<ChatType> {
  try {
    const response = await fetch('/api/create-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ provider: selectedProvider }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create new chat");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}