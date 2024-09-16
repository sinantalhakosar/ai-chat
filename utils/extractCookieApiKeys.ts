export function extractCookieApiKeys(cookieHeader: string | null) {
    const openAIApiKey = getCookieValue(cookieHeader, "OPENAI_API_KEY");
    const googleApiKey = getCookieValue(
      cookieHeader,
      "GOOGLE_GENERATIVE_AI_API_KEY"
    );
    const anthropicApiKey = getCookieValue(
      cookieHeader,
      "ANTHROPIC_API_KEY"
    );

    return {
        openAIApiKey,
        googleApiKey,
        anthropicApiKey
    }
}

// Helper function to get cookie value
function getCookieValue(
    cookieHeader: string | null,
    name: string
  ): string | undefined {
    if (!cookieHeader) return undefined;
    const match = cookieHeader.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : undefined;
  }