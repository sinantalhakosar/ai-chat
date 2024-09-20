export function extractAndJoinMatchingStrings(input: string): string {
    // Regex: `0:"`
    const regex = /0:"([^"]*)"/g;
  
    let matches: string[] = [];
  
    let match: RegExpExecArray | null;
    while ((match = regex.exec(input)) !== null) {
      matches.push(match[1]);
    }
  
    return matches.join(" ");
  }