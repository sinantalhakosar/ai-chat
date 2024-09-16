import { createClient } from "./client";

export async function deleteLastMessageFromChat(chatId: number) {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("chat_id", chatId)
      .eq("sender", "assistant")
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    throw error;
  }
}
