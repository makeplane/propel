import {
  AlertDialog,
  AlertDialogActions,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogIcon,
  AlertDialogIntro,
  AlertDialogTitle,
} from "@makeplane/propel/components/alert-dialog";
import { Button } from "@makeplane/propel/components/button";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@makeplane/propel/components/menu";
import { TriangleAlert } from "lucide-react";
import * as React from "react";

export default function OpenFromMenuDemo() {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  return (
    <>
      <Menu>
        <Button
          sizing="hug"
          prominence="secondary"
          tone="neutral"
          magnitude="xl"
          render={<MenuTrigger />}
          label="Project options"
        />
        <MenuContent sizing="sm">
          <MenuItem label="Rename" />
          <MenuItem label="Duplicate" />
          <MenuItem onClick={() => setConfirmOpen(true)} label="Delete project…" />
        </MenuContent>
      </Menu>
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogIcon tone="danger">
              <TriangleAlert />
            </AlertDialogIcon>
            <AlertDialogIntro>
              <AlertDialogTitle>Delete project?</AlertDialogTitle>
              <AlertDialogDescription>
                This permanently removes the project and all of its work items. This action
                can&apos;t be undone.
              </AlertDialogDescription>
            </AlertDialogIntro>
          </AlertDialogHeader>
          <AlertDialogActions>
            <Button
              sizing="hug"
              prominence="secondary"
              tone="neutral"
              magnitude="xl"
              render={<AlertDialogClose />}
              label="Cancel"
            />
            <Button
              sizing="hug"
              prominence="primary"
              tone="danger"
              magnitude="xl"
              render={<AlertDialogClose />}
              label="Delete"
            />
          </AlertDialogActions>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
