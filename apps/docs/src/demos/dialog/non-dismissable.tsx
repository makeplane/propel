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

export default function NonDismissableDemo() {
  return (
    <Dialog disablePointerDismissal>
      <Button
        fillType="hug"
        variant="secondary"
        size="xl"
        render={<DialogTrigger />}
        label="Open locked dialog"
      />
      <DialogContent magnitude="sm">
        <DialogHeader>
          <DialogHeading>
            <DialogTitle>Unsaved changes</DialogTitle>
          </DialogHeading>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            Choose an action — clicking outside won&apos;t dismiss.
          </DialogDescription>
        </DialogBody>
        <DialogActions>
          <Button
            fillType="hug"
            variant="secondary"
            size="xl"
            render={<DialogClose />}
            label="Discard"
          />
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
