"use client";

import { Message } from "ai/react/dist";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface ConversationBubbleProps {
  content: string;
  type: Message["role"];
  isTyping: boolean;
}

export const ConversationBubble = ({
  content,
  type,
  isTyping,
}: ConversationBubbleProps) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const [displayedContent, setDisplayedContent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const bubbleClassColor = type !== "user" ? "bg-slate-700" : "bg-[#4C4C4C]";

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
        className={`${bubbleClassColor} p-3 ${isDesktop ? "max-w-[50%]" : "max-w-full"} whitespace-pre-wrap text-sm text-white rounded-2xl mr-2`}
      >
        {displayedContent}
        {isTyping && currentIndex < content.length && (
          <span className="inline-block w-1 h-4 ml-1 bg-current animate-blink"></span>
        )}
      </div>
    </div>
  );
};
