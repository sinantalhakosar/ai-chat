import { MessageType } from "@/types/Common.types";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// dynamic data outside of try/catch: https://stackoverflow.com/a/78010468/12527519
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chatId");

  try {
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

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true })
      .returns<MessageType[]>();

    const { data: chatSummary, error: chatSummaryError } = await supabase
      .from("chats")
      .select("summary")
      .eq("id", chatId)
      .single<string>();

    if (error || chatSummaryError) {
      console.error("Error fetching messages:", error);
      return NextResponse.json(
        { error: "Error fetching messages" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      messages: data,
      chatSummary: chatSummary,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
