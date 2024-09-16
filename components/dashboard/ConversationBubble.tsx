"use client";

import { Message } from "ai/react/dist";
import React, { useEffect, useState } from "react";

interface ConversationBubbleProps {
  content: string;
  type: Message["role"];
  isTyping: boolean;
}

export const ConversationBubble: React.FC<ConversationBubbleProps> = ({
  content,
  type,
  isTyping,
}) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const bubbleClass =
    type !== "user"
      ? "bg-[#2f333c] rounded-lg ml-2"
      : "bg-[#7189f5] text-white rounded-lg mr-2";

  const containerClass =
    type !== "user" ? "flex justify-start" : "flex justify-end";

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

  return (
    <div className={containerClass}>
      <div
        className={`${bubbleClass} p-3 max-w-[80%] whitespace-pre-wrap text-sm`}
      >
        {displayedContent}
        {isTyping && currentIndex < content.length && (
          <span className="inline-block w-1 h-4 ml-1 bg-current animate-blink"></span>
        )}
      </div>
    </div>
  );
};
