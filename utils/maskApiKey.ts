export function maskApiKey(apiKey: string) {
  return apiKey.slice(0, 4) + "•".repeat(8);
}
