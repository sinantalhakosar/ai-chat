import { ChatType } from "@/types/Common.types";
import { Edit2, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { ChatNameEditDialog } from "@/components/chat/ChatNameEditDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { ChatDeleteDialog } from "@/components/chat/ChatDeleteDialog";
import { cn } from "@/lib/utils";

interface Props {
  id: ChatType["id"];
  name: string;
  active: boolean;
  onClick: (chatId: ChatType["id"]) => void;
  onEdit: (name: string) => void;
  onDelete: () => void;
}

export const Chat = ({
  id,
  name,
  onClick,
  active,
  onEdit,
  onDelete,
}: Props) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const truncatedName = name
    ? name.length > 15
      ? name.slice(0, 15) + "..."
      : name
    : "Untitled";

  return (
    <div
      className={cn(
        active
          ? "bg-[#4C4C4C]"
          : "relative flex flex-row justify-between cursor-pointer py-2 pl-4 pr-2 hover:bg-[#4C4C4C] rounded-lg"
      )}
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="z-50 dark:bg-[#202020] flex flex-col p-2"
        >
          <DropdownMenuItem
            onClick={() => setEditDialogOpen(true)}
            onTouchStart={(e) => {
              e.preventDefault();
              setEditDialogOpen(true);
            }}
            className="flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit chat name</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setDeleteDialogOpen(true)}
            onTouchStart={(e) => {
              e.preventDefault();
              setDeleteDialogOpen(true);
            }}
            className="flex items-center gap-2"
          >
            <Trash className="w-4 h-4" />
            <span>Delete chat</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ChatNameEditDialog
        name={name}
        open={editDialogOpen}
        onEdit={(name) => {
          setEditDialogOpen(false);
          onEdit(name);
        }}
        onClose={() => {
          setEditDialogOpen(false);
        }}
      />

      <ChatDeleteDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
        }}
        onDelete={() => {
          setDeleteDialogOpen(false);
          onDelete();
        }}
      />
    </div>
  );
};
