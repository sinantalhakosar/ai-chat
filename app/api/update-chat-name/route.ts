import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { chatId, newName } = await request.json();

    if (!chatId || !newName) {
      return NextResponse.json({ error: "Chat ID and new name are required" }, { status: 400 });
    }

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("chats")
      .update({ name: newName })
      .eq("id", chatId)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating chat name:", error);
      return NextResponse.json({ error: "Error updating chat name" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}