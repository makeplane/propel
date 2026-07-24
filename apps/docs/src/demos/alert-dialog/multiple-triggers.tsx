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
  createAlertDialogHandle,
} from "@makeplane/propel/components/alert-dialog";
import { Button } from "@makeplane/propel/components/button";
import { TriangleAlert } from "lucide-react";

// One shared confirmation driven by detached triggers: each trigger passes the project it acts on
// as its `payload`, and the root reads that payload to personalize the copy.
const deleteProjectHandle = createAlertDialogHandle();

export default function MultipleTriggersDemo() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {["Mobile app", "Design system"].map((project) => (
          <Button
            key={project}
            fillType="hug"
            variant="secondary"
            size="xl"
            render={<AlertDialogTrigger handle={deleteProjectHandle} payload={project} />}
            label={`Delete ${project}`}
          />
        ))}
      </div>
      <AlertDialog handle={deleteProjectHandle}>
        {({ payload }: { payload: unknown }) => (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogIcon tone="danger">
                <TriangleAlert />
              </AlertDialogIcon>
              <AlertDialogIntro>
                <AlertDialogTitle>
                  Delete {typeof payload === "string" ? payload : "this project"}?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently removes the project and all of its work items. This action
                  can&apos;t be undone.
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
        )}
      </AlertDialog>
    </>
  );
}
