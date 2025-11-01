"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Spinner from "./spinner";

interface ActionConfirmationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: any;
  onAccept?: () => void;
  onReject?: () => void;
  isLoading?: boolean;
  acceptText?: string;
  rejectText?: string;
}

export default function ActionConfirmationModal({
  open,
  setOpen,
  title,
  description,
  onAccept,
  onReject,
  isLoading = false,
  acceptText,
  rejectText,
}: ActionConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="my-2">{description}</DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          {rejectText && (
            <Button
              variant="destructive"
              className="min-w-[100px]"
              onClick={onReject}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : rejectText}
            </Button>
          )}

          {acceptText && (
            <Button
              className="min-w-[100px]"
              onClick={onAccept}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : acceptText}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
