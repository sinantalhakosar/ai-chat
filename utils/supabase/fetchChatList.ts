import { createClient } from "./client";
import { ChatType, Provider } from "@/types/Common.types";

export async function fetchChatList(
  selectedProvider: Provider
): Promise<Array<ChatType>> {
  try {
    const supabase = createClient();

    const { data, error, status } = await supabase
      .from("chats")
      .select("*")
      .eq("provider", selectedProvider)
      .order("created_at", { ascending: false })
      .returns<Array<ChatType>>();

    if (error && status !== 406) {
      throw error;
    }

    return data || [];
  } catch (error) {
    throw error;
  }
}
