import { ChatType } from "@/types/Common.types";

interface Props {
  chat: ChatType;
  active: boolean;
  onClick: (chatId: ChatType["id"]) => void;
}

export const Chat = ({ chat, onClick, active }: Props) => {
  const { updated_at, name } = chat;

  const time = new Date(updated_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div
      className={`flex flex-row justify-between cursor-pointer hover:bg-[#2f333c] p-4 rounded-2xl gap-2 ${active ? "bg-[#2f333c]" : ""}`}
      onClick={() => onClick(chat.id)}
    >
      <div className="text-sm font-medium">{name ?? "Untitled"}</div>
      <div className="text-sm font-medium">{time}</div>
    </div>
  );
};
