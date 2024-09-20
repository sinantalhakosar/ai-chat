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
    <>
      <div
        className={cn(
          "relative flex flex-row items-center justify-between cursor-pointer py-2 ml-2 px-2 rounded-lg whitespace-nowrap overflow-hidden",
          active ? "bg-[#4C4C4C]" : "hover:bg-[#4C4C4C]"
        )}
        onClick={(e) => {
          e.preventDefault();
          onClick(id);
        }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400 rounded-l-lg"></div>
        <div className="flex flex-grow justify-between items-center text-sm font-medium pl-2">
          {truncatedName}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="z-50 dark:bg-[#202020] flex flex-col p-2"
          >
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setEditDialogOpen(true);
              }}
              onTouchEnd={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setEditDialogOpen(true);
              }}
              className="flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit chat name</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setDeleteDialogOpen(true);
              }}
              onTouchEnd={(e) => {
                e.stopPropagation();
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
      </div>

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
    </>
  );
};
