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
} from "@makeplane/propel/components/dialog";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from "@makeplane/propel/components/menu";
import { Link2, Pencil, Trash2, X } from "lucide-react";
import * as React from "react";

export default function OpenFromMenuDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Menu>
        <Button
          fillType="hug"
          variant="secondary"
          size="xl"
          render={<MenuTrigger />}
          label="Project options"
        />
        <MenuContent sizing="sm">
          <MenuItem icon={<Icon icon={Pencil} tint="secondary" />} label="Edit" />
          <MenuItem icon={<Icon icon={Link2} tint="secondary" />} label="Copy link" />
          <MenuSeparator />
          <MenuItem
            tone="danger"
            icon={<Icon icon={Trash2} />}
            onClick={() => setOpen(true)}
            label="Delete project…"
          />
        </MenuContent>
      </Menu>
      <Dialog open={open} onOpenChange={setOpen}>
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
    </>
  );
}
