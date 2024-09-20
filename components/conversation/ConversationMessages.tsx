import { Skeleton } from "@/components/ui/Skeleton";
import { times } from "lodash";
import { EmptyConversation } from "@/components/conversation/EmptyConversation";
import { ConversationBubble } from "@/components/conversation/ConversationBubble";
import { Message } from "ai";
import { ConversationBubbleHelpers } from "@/components/conversation/ConversationBubbleHelpers";
import { cn } from "@/lib/utils";

interface Props {
  messages: Message[];
  loading: boolean;
  isResponseLoading: boolean;
  handleRegenerateClick: () => void;
  handleCopyClick: (content: string) => void;
}

export const ConversationMessages = ({
  messages,
  loading,
  isResponseLoading,
  handleRegenerateClick,
  handleCopyClick,
}: Props) => {
  if (loading) {
    return times(8).map((index) => (
      <Skeleton
        key={index}
        className={cn(
          "w-[400px] h-[50px] rounded-full bg-[#2f333c]",
          index % 2 === 0 ? "ml-auto" : ""
        )}
      />
    ));
  }

  if (messages.length === 0) {
    return <EmptyConversation />;
  }

  return (
    <div className="overflow-y-auto">
      {messages.map((message) => (
        <div key={message.id} className="flex flex-col mb-4">
          <ConversationBubble
            content={message.content}
            type={message.role}
            isTyping={
              message.role === "assistant" &&
              message.id === messages[messages.length - 1].id &&
              isResponseLoading
            }
          />

          {message.role === "assistant" && (
            <ConversationBubbleHelpers
              handleRegenerateClick={handleRegenerateClick}
              handleCopyClick={handleCopyClick}
              messageContent={message.content}
              isLastMessage={message.id === messages[messages.length - 1].id}
            />
          )}
        </div>
      ))}
    </div>
  );
};
