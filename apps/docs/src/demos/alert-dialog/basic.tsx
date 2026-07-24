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
  AlertDialogTrigger,
} from "@makeplane/propel/components/alert-dialog";
import { Button } from "@makeplane/propel/components/button";
import { TriangleAlert } from "lucide-react";

export default function BasicDemo() {
  return (
    <AlertDialog>
      <Button
        fillType="hug"
        variant="danger"
        size="xl"
        render={<AlertDialogTrigger />}
        label="Delete project"
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogIcon tone="danger">
            <TriangleAlert />
          </AlertDialogIcon>
          <AlertDialogIntro>
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the project and all of its work items. This action can&apos;t
              be undone.
            </AlertDialogDescription>
          </AlertDialogIntro>
        </AlertDialogHeader>
        <AlertDialogActions>
          <Button
            fillType="hug"
            variant="secondary"
            size="xl"
            render={<AlertDialogClose />}
            label="Cancel"
          />
          <Button
            fillType="hug"
            variant="danger"
            size="xl"
            render={<AlertDialogClose />}
            label="Delete"
          />
        </AlertDialogActions>
      </AlertDialogContent>
    </AlertDialog>
  );
}
