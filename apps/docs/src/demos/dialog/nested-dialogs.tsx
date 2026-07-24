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

export default function NestedDialogsDemo() {
  return (
    <Dialog>
      <Button
        fillType="hug"
        variant="secondary"
        size="xl"
        render={<DialogTrigger />}
        label="Invite teammates"
      />
      <DialogContent magnitude="md">
        <DialogHeader>
          <DialogHeading>
            <DialogTitle>Invite teammates</DialogTitle>
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
            Invited members join with the Member role. Need something more specific? Create a custom
            role first.
          </DialogDescription>
        </DialogBody>
        <DialogActions>
          <Dialog>
            <Button
              fillType="hug"
              variant="secondary"
              size="xl"
              render={<DialogTrigger />}
              label="Create custom role"
            />
            <DialogContent magnitude="sm">
              <DialogHeader>
                <DialogHeading>
                  <DialogTitle>Create custom role</DialogTitle>
                </DialogHeading>
              </DialogHeader>
              <DialogBody>
                <DialogDescription>
                  Custom roles scope what invited members can see and edit.
                </DialogDescription>
              </DialogBody>
              <DialogActions>
                <Button
                  fillType="hug"
                  variant="secondary"
                  size="xl"
                  render={<DialogClose />}
                  label="Back"
                />
              </DialogActions>
            </DialogContent>
          </Dialog>
          <Button
            fillType="hug"
            variant="primary"
            size="xl"
            render={<DialogClose />}
            label="Send invites"
          />
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
