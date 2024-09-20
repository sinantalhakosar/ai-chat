"use client";

import { useAnimatedTyping } from "@/hooks/useAnimatedTyping";
import { cn } from "@/lib/utils";
import { LineChart } from "@mui/x-charts/LineChart";
import { Message } from "ai/react/dist";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

interface ConversationBubbleProps {
  content: string;
  type: Message["role"];
  isTyping: boolean;
  chartData?: number[];
}

export const ConversationBubble = ({
  content,
  type,
  isTyping,
  chartData,
}: ConversationBubbleProps) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const { displayedContent, currentIndex } = useAnimatedTyping({
    content,
    isTyping,
  });

  if (content) {
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
  } else if (chartData) {
    return (
      <div
        className={cn(
          type !== "user" ? "bg-slate-700" : "bg-[#4C4C4C]",
          isDesktop ? "max-w-[50%]" : "max-w-full",
          "p-3 whitespace-pre-wrap text-sm text-white rounded-2xl mr-2"
        )}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LineChart
            xAxis={[
              { data: Array.from({ length: chartData.length }, (_, i) => i) },
            ]}
            series={[{ data: chartData }]}
            width={500}
            height={300}
          />
        </motion.div>
      </div>
    );
  }

  return null;
};
