export function extractArrayFromString(input: string): number[] | undefined {
  // Regex:"data":[
  const regex = /"data":\[(.*?)\]/;

  const match = regex.exec(input);

  if (match && match[1]) {
    const arrayString = match[1];
    try {
      const resultArray = JSON.parse(`[${arrayString}]`);
      if (Array.isArray(resultArray)) {
        return resultArray as number[];
      }
    } catch (error) {
      console.error("Error parsing array:", error);
    }
  }

  return undefined;
}
