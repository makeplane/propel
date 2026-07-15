import { X } from "lucide-react";

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

export default function BasicDemo() {
  return (
    <Dialog>
      <Button
        sizing="hug"
        prominence="secondary"
        tone="neutral"
        magnitude="xl"
        render={<DialogTrigger />}
        label="Delete project"
      />
      <DialogContent magnitude="sm">
        <DialogHeader>
          <DialogHeading>
            <DialogTitle>Delete project</DialogTitle>
          </DialogHeading>
          <IconButton
            prominence="ghost"
            tone="neutral"
            magnitude="lg"
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
            sizing="hug"
            prominence="secondary"
            tone="neutral"
            magnitude="xl"
            render={<DialogClose />}
            label="Cancel"
          />
          <Button
            sizing="hug"
            prominence="primary"
            tone="danger"
            magnitude="xl"
            render={<DialogClose />}
            label="Delete"
          />
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
