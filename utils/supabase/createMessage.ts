import { createClient } from "./client";

export async function createMessage(
  chatId: number,
  messageContent: string,
  sender: string
): Promise<void> {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from("messages")
      .insert([
        {
          chat_id: chatId,
          content: messageContent,
          sender: sender, // 'user' or 'assistant'
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return;
  } catch (error) {
    console.error("Error creating new message:", error);
    throw error;
  }
}
