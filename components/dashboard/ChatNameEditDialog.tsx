import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useState } from "react";

interface Props {
  open: boolean;
  name: string;
  onClose: () => void;
  onEdit: (name: string) => void;
}

export function ChatNameEditDialog({ open, name, onEdit, onClose }: Props) {
  const [editingName, setEditingName] = useState(name);

  const handleChatNameChange = async () => {
    if (editingName && editingName.trim() !== "") {
      onEdit(editingName);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-[300px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit chat name</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            className="bg-slate-700 hover:bg-slate-600"
            onClick={handleChatNameChange}
            disabled={!editingName || editingName.trim() === ""}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
