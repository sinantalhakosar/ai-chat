import { createClient } from "./client";

export async function updateChatName(chatId: number, newName: string) {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("chats")
      .update({ name: newName })
      .eq("id", chatId);

    if (error) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
