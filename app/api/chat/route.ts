import { streamText, convertToCoreMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createAnthropic } from "@ai-sdk/anthropic";
import { extractCookieApiKeys } from "@/utils/extractCookieApiKeys";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  // Read API keys from cookies
  const cookieHeader = req.headers.get("cookie");
  const { openAIApiKey, googleApiKey, anthropicApiKey } = extractCookieApiKeys(cookieHeader);

  let result;

  switch (model) {
    case "gpt-4-turbo":
    case "gpt-4-turbo-2024-04-09":
    case "gpt-4-turbo-preview":
    case "gpt-4-0125-preview":
    case "gpt-4-1106-preview":
    case "gpt-4":
    case "gpt-4-0613":
    case "gpt-3.5-turbo-0125":
    case "gpt-3.5-turbo":
    case "gpt-3.5-turbo-1106":
      if (!openAIApiKey) {
        throw new Error("OpenAI API key not found");
      }

      const openai = createOpenAI({ apiKey: openAIApiKey });

      result = await streamText({
        model: openai(model),
        messages: convertToCoreMessages(messages),
      });
      break;
    case "gemini-1.5-flash-latest":
    case "gemini-1.5-flash":
    case "gemini-1.5-pro-latest":
    case "gemini-1.5-pro":
    case "gemini-1.0-pro":
    case "gemini-pro":
      if (!googleApiKey) {
        throw new Error("Google API key not found");
      }

      const google = createGoogleGenerativeAI({ apiKey: googleApiKey });

      result = await streamText({
        model: google(model),
        messages: convertToCoreMessages(messages),
      });
      break;
    case "claude-3-5-sonnet-20240620":
    case "claude-3-opus-20240229":
    case "claude-3-sonnet-20240229":
    case "claude-3-haiku-20240307":
      if (!anthropicApiKey) {
        throw new Error("Anthropic API key not found");
      }

      const anthropic = createAnthropic({ apiKey: anthropicApiKey });

      result = await streamText({
        model: anthropic(model),
        messages: convertToCoreMessages(messages),
      });
      break;
    default:
      throw new Error(`Unsupported model: ${model}`);
  }

  return result.toDataStreamResponse();
}
