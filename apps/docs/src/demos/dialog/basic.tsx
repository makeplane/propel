import { Button } from "@makeplane/propel/components/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogHeading,
  DialogTitle,
  DialogTrigger,
} from "@makeplane/propel/components/dialog";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { X } from "lucide-react";

export default function BasicDemo() {
  return (
    <Dialog>
      <Button
        fillType="hug"
        variant="secondary"
        size="xl"
        render={<DialogTrigger />}
        label="Delete project"
      />
      <DialogContent magnitude="sm">
        <DialogHeader>
          <DialogHeading>
            <DialogTitle>Delete project</DialogTitle>
          </DialogHeading>
          <IconButton
            variant="ghost"
            size="lg"
            aria-label="Close"
            render={<DialogClose />}
            icon={<Icon icon={X} />}
          />
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            This permanently removes the project and all of its work items. This action can&apos;t
            be undone.
          </DialogDescription>
        </DialogBody>
        <DialogActions>
          <Button
            fillType="hug"
            variant="secondary"
            size="xl"
            render={<DialogClose />}
            label="Cancel"
          />
          <Button
            fillType="hug"
            variant="danger"
            size="xl"
            render={<DialogClose />}
            label="Delete"
          />
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
