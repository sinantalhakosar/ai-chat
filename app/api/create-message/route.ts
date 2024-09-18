import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { chatId, content, sender } = await request.json();

    if (!chatId || !content || !sender) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

    if (sender === "assistant") {
      // First, count the number of messages for this chatId
      const { count, error: countError } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("chat_id", chatId);

      if (countError) {
        console.error("Error counting messages:", countError);
        return NextResponse.json(
          { error: "Error counting messages" },
          { status: 500 }
        );
      }

      // If there are already 50 messages, delete the oldest one
      if (count && count > 50) {
        const { error: deleteError } = await supabase
          .from("messages")
          .delete()
          .eq("chat_id", chatId)
          .order("created_at", { ascending: true })
          .limit(1);

        if (deleteError) {
          console.error("Error deleting oldest message:", deleteError);
          return NextResponse.json(
            { error: "Error deleting oldest message" },
            { status: 500 }
          );
        }
      }
    }

    // Insert the new message
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          chat_id: chatId,
          content: content,
          sender: sender,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating new message:", error);
      return NextResponse.json(
        { error: "Error creating new message" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
