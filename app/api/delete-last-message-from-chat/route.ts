import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chatId");

  if (!chatId) {
    return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
  }

  const supabase = createClient();

  try {
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting last message:", error);
    return NextResponse.json({ error: "Failed to delete last message" }, { status: 500 });
  }
}