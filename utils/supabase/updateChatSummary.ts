"use server";

import { createClient } from "@/utils/supabase/client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, Message } from "ai";

export async function updateChatSummary(chatId: number, messages: Message[]) {
  const supabase = createClient();

  const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  });

  const prompt = `Summarize the following conversation in 10-15 sentences:\n\n${messages
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n")}`;

  const { text } = await generateText({
    model: google("gemini-1.5-flash-latest"),
    prompt,
  });

  const { error } = await supabase
    .from("chats")
    .update({ summary: text })
    .eq("id", chatId);

  if (error) throw error;

  return true;
}
