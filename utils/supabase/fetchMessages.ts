import { createClient } from "@/utils/supabase/client";
import { MessageType } from "@/types/Common.types";

export async function fetchMessages(selectedChatId: number | null): Promise<MessageType[]> {
  if (!selectedChatId) {
    return [];
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", selectedChatId)
    .order("created_at", { ascending: true }).returns<MessageType[]>();

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }

  return data || [];
}