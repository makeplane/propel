import { Button } from "@makeplane/propel/components/button";
import {
  createDialogHandle,
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

// A handle links triggers that live far from the dialog they open, so several
// launch points can share one dialog without hoisting controlled state.
const shortcutsDialog = createDialogHandle();

export default function DetachedTriggersDemo() {
  return (
    <div className="flex items-center gap-2">
      <Button
        sizing="hug"
        prominence="secondary"
        tone="neutral"
        magnitude="xl"
        render={<DialogTrigger handle={shortcutsDialog} />}
        label="Keyboard shortcuts"
      />
      <Button
        sizing="hug"
        prominence="ghost"
        tone="neutral"
        magnitude="xl"
        render={<DialogTrigger handle={shortcutsDialog} />}
        label="Help"
      />
      <Dialog handle={shortcutsDialog}>
        <DialogContent magnitude="sm">
          <DialogHeader>
            <DialogHeading>
              <DialogTitle>Keyboard shortcuts</DialogTitle>
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
              Press <kbd>C</kbd> to create a work item, <kbd>/</kbd> to search, and <kbd>?</kbd> to
              reopen this list from anywhere.
            </DialogDescription>
          </DialogBody>
          <DialogActions>
            <Button
              sizing="hug"
              prominence="primary"
              tone="neutral"
              magnitude="xl"
              render={<DialogClose />}
              label="Done"
            />
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
