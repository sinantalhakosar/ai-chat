import { Message } from 'ai/react/dist';
import React from 'react';

interface ConversationBubbleProps {
  content: string;
  type: Message["role"];
}

export const ConversationBubble: React.FC<ConversationBubbleProps> = ({ content, type }) => {
  const bubbleClass = type !== 'user'
    ? 'bg-[#2f333c] rounded-lg ml-2'
    : 'bg-[#7189f5] text-white rounded-lg mr-2';

  const containerClass = type !== 'user'
    ? 'flex justify-start'
    : 'flex justify-end';

  return (
    <div className={`${containerClass} mb-4`}>
      <div className={`${bubbleClass} p-3 max-w-[80%] whitespace-pre-wrap text-sm`}>
        {content}
      </div>
    </div>
  );
};