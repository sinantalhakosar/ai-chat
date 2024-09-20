"use client";

import { useAnimatedTyping } from "@/hooks/useAnimatedTyping";
import { cn } from "@/lib/utils";
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

  const { displayedContent, currentIndex } = useAnimatedTyping({
    content,
    isTyping,
  });

  const animate = isTyping && currentIndex < content.length;

  return (
    <div
      className={type !== "user" ? "flex justify-start" : "flex justify-end"}
    >
      <div
        className={cn(
          type !== "user" ? "bg-slate-700" : "bg-[#4C4C4C]",
          isDesktop ? "max-w-[50%]" : "max-w-full",
          "p-3 whitespace-pre-wrap text-sm text-white rounded-2xl mr-2"
        )}
      >
        {displayedContent}

        {animate && (
          <span className="inline-block w-1 h-4 ml-1 bg-current animate-blink"></span>
        )}
      </div>
    </div>
  );
};
