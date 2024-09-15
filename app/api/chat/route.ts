import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { streamText, convertToCoreMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  let result;

  switch (model) {
    case ModelType.GPT3_5_TURBO:
    case ModelType.GPT4:
    case ModelType.GPT4_TURBO:
      result = await streamText({
        model: openai(model),
        messages: convertToCoreMessages(messages),
      });
      break;
    case ModelType.GEMINI_PRO:
    case ModelType.GEMINI_1_5_FLASH:
      result = await streamText({
        model: google(model),
        messages: convertToCoreMessages(messages),
      });
      break;
    default:
      throw new Error(`Unsupported model: ${model}`);
  }

  return result.toDataStreamResponse();
}

export enum ModelType {
  // OpenAI models
  GPT3_5_TURBO = "gpt-3.5-turbo",
  GPT3_5_TURBO_16K = "gpt-3.5-turbo-16k",
  GPT4 = "gpt-4",
  GPT4_32K = "gpt-4-32k",
  GPT4_TURBO = "gpt-4-1106-preview",

  // Google models
  GEMINI_PRO = "gemini-pro",
  GEMINI_1_5_FLASH = "gemini-1.5-flash-latest",
}
