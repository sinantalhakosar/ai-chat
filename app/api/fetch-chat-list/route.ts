import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { ChatType, Provider } from "@/types/Common.types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get("provider") as Provider;

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
      .select("*")
      .eq("provider", provider)
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .returns<Array<ChatType>>();
      
    if (error) {
      console.error("Error fetching chat list:", error);
      return NextResponse.json({ error: "Error fetching chat list" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}