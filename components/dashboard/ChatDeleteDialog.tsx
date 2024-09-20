import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export function ChatDeleteDialog({ open, onClose, onDelete }: Props) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-[300px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete chat?</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">This action cannot be undone.</div>

        <DialogFooter>
          <Button
            type="submit"
            className="bg-red-700 hover:bg-red-600"
            onClick={onDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
