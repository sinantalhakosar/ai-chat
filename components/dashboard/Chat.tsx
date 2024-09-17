import { ChatType } from "@/types/Common.types";
import { useState } from "react";
import { IconButton } from "../ui/IconButton";
import { Check, Edit2 } from "lucide-react";
import { Input } from "../ui/Input";
import { updateChatName } from "@/utils/api/updateChatName";

interface Props {
  chat: ChatType;
  active: boolean;
  onClick: (chatId: ChatType["id"]) => void;
  onNameChange: () => void;
}

export const Chat = ({ chat, onClick, active, onNameChange }: Props) => {
  const { updated_at, name } = chat;

  const [isHovering, setIsHovering] = useState(false);

  const time = new Date(updated_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingName, setEditingName] = useState(name);

  const handleChatNameChange = async () => {
    if (editingName && editingName.trim() !== "") {
      const result = await updateChatName(chat.id, editingName);
      if (result) {
        setIsEditing(false);
        onNameChange();
      }
    }
  };

  return (
    <div
      className={`flex flex-row justify-between cursor-pointer ${isEditing ? "p-0" : "p-4 hover:bg-[#2f333c]"} rounded-2xl gap-2 ${active ? "bg-[#2f333c]" : ""}`}
      onClick={() => onClick(chat.id)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isEditing ? (
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Search chats..."
            className="w-full rounded-2xl pr-10" // Added right padding for the button
            value={editingName ?? ""}
            onChange={(e) => {
              setEditingName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleChatNameChange();
              }
            }}
          />
          <IconButton
            icon={Check}
            className="absolute right-2 text-gray-400"
            style={{ minWidth: "auto" }} // Ensure button doesn't expand
            onClick={handleChatNameChange}
          />
        </div>
      ) : (
        <>
          <div className="text-sm font-medium">{name ?? "Untitled"}</div>
          <div className="text-sm font-medium">{time}</div>
          <Edit2
            className={`${isHovering ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}
            width={18}
            height={18}
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          />
        </>
      )}
    </div>
  );
};
