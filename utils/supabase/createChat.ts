import { ChatType, Provider } from "@/types/Common.types";
import { createClient } from "./client";

export async function createChat(selectedProvider: Provider): Promise<ChatType> {
  try {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("chats")
      .insert([
        {
          user_id: user?.id,
          provider: selectedProvider,
          name: "New Chat",
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error creating new chat:", error);
    alert("Failed to create new chat");
    throw error; // Re-throw the error to propagate it
  }
}
