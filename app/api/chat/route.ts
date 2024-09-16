import { streamText, convertToCoreMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createAnthropic } from "@ai-sdk/anthropic";
import { extractCookieApiKeys } from "@/utils/extractCookieApiKeys";
import {
  availableAnthropicModels,
  availableGoogleModels,
  availableOpenAIModels,
} from "@/types/Common.types";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, model } = await req.json();

    // Read API keys from cookies
    const cookieHeader = req.headers.get("cookie");
    const { openAIApiKey, googleApiKey, anthropicApiKey } =
      extractCookieApiKeys(cookieHeader);

    let result;

    if (availableOpenAIModels.includes(model)) {
      if (!openAIApiKey) {
        throw new Error("OpenAI API key not found");
      }

      const openai = createOpenAI({ apiKey: openAIApiKey });

      result = await streamText({
        model: openai(model),
        messages: convertToCoreMessages(messages),
      });

      return result.toTextStreamResponse();
    }

    if (availableGoogleModels.includes(model)) {
      if (!googleApiKey) {
        throw new Error("Google API key not found");
      }

      const google = createGoogleGenerativeAI({ apiKey: googleApiKey });

      result = await streamText({
        model: google(model),
        messages: convertToCoreMessages(messages),
      });

      return result.toTextStreamResponse();
    }

    if (availableAnthropicModels.includes(model)) {
      if (!anthropicApiKey) {
        throw new Error("Anthropic API key not found");
      }

      const anthropic = createAnthropic({ apiKey: anthropicApiKey });

      result = await streamText({
        model: anthropic(model),
        messages: convertToCoreMessages(messages),
      });

      return result.toTextStreamResponse();
    }

    throw new Error("Model not supported");
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}
