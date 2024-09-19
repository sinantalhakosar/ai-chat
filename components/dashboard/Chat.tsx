import { ChatType } from "@/types/Common.types";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import { ChatNameEditDialog } from "@/components/dashboard/ChatNameEditDialog";

interface Props {
  id: ChatType["id"];
  name: string;
  active: boolean;
  onClick: (chatId: ChatType["id"]) => void;
  onEdit: () => void;
}

export const Chat = ({ id, name, onClick, active, onEdit }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const truncatedName = name
    ? name.length > 15
      ? name.slice(0, 15) + "..."
      : name
    : "Untitled";

  return (
    <div
      className={`relative flex flex-row justify-between cursor-pointer p-4 hover:bg-[#4C4C4C] rounded-lg ${active ? "bg-[#4C4C4C]" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        onClick(id);
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        onClick(id);
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400 rounded-l-lg"></div>
      <div className="flex flex-grow justify-between items-center text-sm font-medium">
        {truncatedName}
      </div>

      <div
        onClick={() => setIsEditing(true)}
        onTouchStart={(e) => {
          e.preventDefault();
          setIsEditing(true);
        }}
      >
        <Edit2 className="w-4 h-4" />
      </div>

      <ChatNameEditDialog
        chatId={id}
        name={name}
        open={isEditing}
        onClose={() => {
          setIsEditing(false);
          onEdit();
        }}
      />
    </div>
  );
};
