import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { Provider } from "@/types/Common.types";

export async function POST(request: Request) {
  try {
    const { provider }: { provider: Provider } = await request.json();

    if (!provider) {
      return NextResponse.json({ error: "Provider is required" }, { status: 400 });
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
      .insert([
        {
          user_id: user.id,
          provider: provider,
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating new chat:", error);
      return NextResponse.json({ error: "Error creating new chat" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}