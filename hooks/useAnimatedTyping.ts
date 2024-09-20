import { useEffect, useState } from "react";

interface Props {
  content: string;
  isTyping: boolean;
}

export function useAnimatedTyping({ content, isTyping }: Props) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        if (currentIndex < content.length) {
          setDisplayedContent((prev) => prev + content[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        } else {
          clearInterval(interval);
        }
      }, 20); // typing speed lower = faster

      return () => clearInterval(interval);
    } else {
      setDisplayedContent(content);
    }
  }, [content, currentIndex, isTyping]);

  return { displayedContent, currentIndex };
}
