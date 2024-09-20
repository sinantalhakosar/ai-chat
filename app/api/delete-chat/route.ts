import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get('chatId');

    if (!chatId) {
      return NextResponse.json(
        { error: "Chat ID is required" },
        { status: 400 }
      );
    }

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete messages associated with the chat
    const { error: messagesError } = await supabase
      .from("messages")
      .delete()
      .eq("chat_id", chatId);

    if (messagesError) {
      console.error("Error deleting messages:", messagesError);
      return NextResponse.json(
        { error: "Error deleting messages" },
        { status: 500 }
      );
    }

    console.log("Deleting chat:", chatId);
    // Delete the chat
    const { error: chatError } = await supabase
      .from("chats")
      .delete()
      .eq("id", chatId)
      .eq("user_id", user.id);

    if (chatError) {
      console.error("Error deleting chat:", chatError);
      return NextResponse.json(
        { error: "Error deleting chat" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
