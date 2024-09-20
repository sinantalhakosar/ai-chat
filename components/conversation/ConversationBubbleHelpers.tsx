import { Copy, RefreshCcw } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { Message } from "ai";

interface Props {
  handleRegenerateClick: () => void;
  handleCopyClick: (content: string) => void;
  messageContent: Message["content"];
  isLastMessage: boolean;
}

export const ConversationBubbleHelpers = ({
  handleRegenerateClick,
  handleCopyClick,
  messageContent,
  isLastMessage,
}: Props) => {
  return (
    <div>
      {isLastMessage && (
        <IconButton
          icon={RefreshCcw}
          disableHover
          onClick={handleRegenerateClick}
        />
      )}

      <IconButton
        icon={Copy}
        disableHover
        onClick={() => handleCopyClick(messageContent)}
      />
    </div>
  );
};
