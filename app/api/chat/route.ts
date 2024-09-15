import { streamText, convertToCoreMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  // Read API keys from cookies
  const cookieHeader = req.headers.get('cookie');
  const openAIApiKey = getCookieValue(cookieHeader, 'OPENAI_API_KEY');
  const googleApiKey = getCookieValue(cookieHeader, 'GOOGLE_GENERATIVE_AI_API_KEY');

  let result;

  switch (model) {
    case ModelType.GPT3_5_TURBO:
    case ModelType.GPT4:
    case ModelType.GPT4_TURBO:
      if (!openAIApiKey) {
        throw new Error("OpenAI API key not found");
      }
      const openai = createOpenAI({ apiKey: openAIApiKey });
      result = await streamText({
        model: openai(model),
        messages: convertToCoreMessages(messages),
      });
      break;
    case ModelType.GEMINI_PRO:
    case ModelType.GEMINI_1_5_FLASH:
      if (!googleApiKey) {
        throw new Error("Google API key not found");
      }
      const google = createGoogleGenerativeAI({ apiKey: googleApiKey });
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

// Helper function to get cookie value
function getCookieValue(cookieHeader: string | null, name: string): string | undefined {
    if (!cookieHeader) return undefined;
    const match = cookieHeader.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : undefined;
}
