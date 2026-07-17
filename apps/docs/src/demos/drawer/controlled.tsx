import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogIntro,
  AlertDialogTitle,
} from "@makeplane/propel/components/alert-dialog";
import { Button } from "@makeplane/propel/components/button";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerDescription,
  DrawerHeader,
  DrawerHeaderContent,
  DrawerPanel,
  DrawerTitle,
  DrawerTrigger,
} from "@makeplane/propel/components/drawer";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { TextArea } from "@makeplane/propel/components/text-area";
import { X } from "lucide-react";
import * as React from "react";

export default function ControlledDemo() {
  const [open, setOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [draft, setDraft] = React.useState("");
  return (
    <>
      <Drawer
        open={open}
        onOpenChange={(nextOpen, eventDetails) => {
          if (!nextOpen && draft.trim() !== "") {
            // Block the dismissal and ask for confirmation while a draft exists.
            eventDetails.cancel();
            setConfirmOpen(true);
            return;
          }
          setOpen(nextOpen);
        }}
      >
        <DrawerTrigger
          render={
            <Button
              sizing="hug"
              prominence="secondary"
              tone="neutral"
              magnitude="xl"
              label="Add comment"
            />
          }
        />
        <DrawerPanel side="end">
          <DrawerHeader>
            <DrawerHeaderContent>
              <DrawerTitle>New comment</DrawerTitle>
              <DrawerDescription>Share feedback on this work item.</DrawerDescription>
            </DrawerHeaderContent>
            <DrawerClose
              render={
                <IconButton
                  prominence="ghost"
                  tone="neutral"
                  magnitude="lg"
                  aria-label="Close"
                  icon={<Icon icon={X} />}
                />
              }
            />
          </DrawerHeader>
          <DrawerBody>
            <TextArea
              magnitude="lg"
              surface="field"
              resize="none"
              rows={4}
              aria-label="Comment"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
          </DrawerBody>
        </DrawerPanel>
      </Drawer>
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogIntro>
              <AlertDialogTitle>Discard comment?</AlertDialogTitle>
              <AlertDialogDescription>
                Your draft will be lost if you close the panel now.
              </AlertDialogDescription>
            </AlertDialogIntro>
          </AlertDialogHeader>
          <AlertDialogActions>
            <Button
              sizing="hug"
              prominence="ghost"
              tone="neutral"
              magnitude="lg"
              onClick={() => setConfirmOpen(false)}
              label="Keep editing"
            />
            <Button
              sizing="hug"
              prominence="primary"
              tone="danger"
              magnitude="lg"
              onClick={() => {
                setConfirmOpen(false);
                setOpen(false);
                setDraft("");
              }}
              label="Discard"
            />
          </AlertDialogActions>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
