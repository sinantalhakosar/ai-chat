import { EmptyConversation } from "@/components/conversation/EmptyConversation";
import { ConversationBubble } from "@/components/conversation/ConversationBubble";
import { Message } from "ai";
import { ConversationBubbleHelpers } from "@/components/conversation/ConversationBubbleHelpers";
import { motion } from "framer-motion";
import { ConversationMessagesSkeleton } from "@/components/conversation/ConversationMessagesSkeleton";
import { extractArrayFromString } from "@/utils/tools/extractArrayFromString";
import { extractAndJoinMatchingStrings } from "@/utils/tools/extractAndJoinMatchingStrings";

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
    return <ConversationMessagesSkeleton />;
  }

  if (messages.length === 0) {
    return <EmptyConversation />;
  }

  return (
    <div
      className="overflow-y-auto"
      ref={(el) => {
        if (el) {
          el.scrollTop = el.scrollHeight;
          el.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }}
    >
      {messages.map((message) => (
        <div key={message.id} className="flex flex-col mb-4">
          {message.role === "user" ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ConversationBubble
                content={message.content}
                type={message.role}
                isTyping={false}
              />
            </motion.div>
          ) : (
            <ConversationBubble
              content={
                extractArrayFromString(message.content) === undefined
                  ? extractAndJoinMatchingStrings(message.content)
                  : ""
              }
              type={message.role}
              isTyping={
                message.id === messages[messages.length - 1].id &&
                isResponseLoading
              }
              chartData={extractArrayFromString(message.content)}
            />
          )}

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
