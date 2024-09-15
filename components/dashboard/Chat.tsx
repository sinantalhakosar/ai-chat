import { ChatType, MessageType } from "@/types/Common.types";

interface Props {
  chat: ChatType;
  active: boolean;
  onClick: (chatId: ChatType["id"]) => void;
}

export const Chat = ({ chat, onClick, active }: Props) => {
  const { content, timestamp } = chat.last_message as MessageType;

  const truncatedMessage =
    content.length > 20 ? content.slice(0, 20) + "..." : content;

  const time = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div
      className={`flex flex-row justify-between cursor-pointer hover:bg-[#2f333c] p-4 rounded-2xl gap-2 ${active ? "bg-[#2f333c]" : ""}`}
      onClick={() => onClick(chat.id)}
    >
      <div className="text-sm font-medium">{truncatedMessage}</div>
      <div className="text-sm font-medium">{time}</div>
    </div>
  );
};
