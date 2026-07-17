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
import { CircleCheck, Info, TriangleAlert, Trash2 } from "lucide-react";

export default function TonesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <AlertDialog>
        <Button
          sizing="hug"
          prominence="primary"
          tone="danger"
          magnitude="xl"
          render={<AlertDialogTrigger />}
          label="Delete project"
        />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogIcon tone="danger">
              <Trash2 />
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

      <AlertDialog>
        <Button
          sizing="hug"
          prominence="secondary"
          tone="neutral"
          magnitude="xl"
          render={<AlertDialogTrigger />}
          label="Archive project"
        />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogIcon tone="warning">
              <TriangleAlert />
            </AlertDialogIcon>
            <AlertDialogIntro>
              <AlertDialogTitle>Archive project?</AlertDialogTitle>
              <AlertDialogDescription>
                Archiving hides the project from your sidebar. You can restore it later from
                workspace settings.
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
              tone="neutral"
              magnitude="xl"
              render={<AlertDialogClose />}
              label="Archive"
            />
          </AlertDialogActions>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <Button
          sizing="hug"
          prominence="secondary"
          tone="neutral"
          magnitude="xl"
          render={<AlertDialogTrigger />}
          label="Transfer ownership"
        />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogIcon tone="info">
              <Info />
            </AlertDialogIcon>
            <AlertDialogIntro>
              <AlertDialogTitle>Transfer ownership?</AlertDialogTitle>
              <AlertDialogDescription>
                Ownership of this project moves to another member. You&apos;ll keep your member
                access.
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
              tone="neutral"
              magnitude="xl"
              render={<AlertDialogClose />}
              label="Transfer"
            />
          </AlertDialogActions>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <Button
          sizing="hug"
          prominence="secondary"
          tone="neutral"
          magnitude="xl"
          render={<AlertDialogTrigger />}
          label="Restore project"
        />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogIcon tone="success">
              <CircleCheck />
            </AlertDialogIcon>
            <AlertDialogIntro>
              <AlertDialogTitle>Restore project?</AlertDialogTitle>
              <AlertDialogDescription>
                This brings the project back to your sidebar with all of its work items intact.
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
              tone="neutral"
              magnitude="xl"
              render={<AlertDialogClose />}
              label="Restore"
            />
          </AlertDialogActions>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
