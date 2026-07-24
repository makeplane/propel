import { Button } from "@makeplane/propel/components/button";
import { Checkbox } from "@makeplane/propel/components/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@makeplane/propel/components/popover";
import * as React from "react";

export default function OpenOnHoverDemo() {
  const [inProgress, setInProgress] = React.useState(true);
  const [assignedToMe, setAssignedToMe] = React.useState(true);

  return (
    <Popover>
      <Button
        fillType="hug"
        variant="secondary"
        size="xl"
        render={<PopoverTrigger openOnHover delay={100} />}
        label="Filters"
      />
      <PopoverContent side="bottom" align="start" sizing="md" aria-label="Active filters">
        <Checkbox
          sizing="fill"
          checked={inProgress}
          onCheckedChange={(next) => setInProgress(Boolean(next))}
          label="State: In progress"
        />
        <Checkbox
          sizing="fill"
          checked={assignedToMe}
          onCheckedChange={(next) => setAssignedToMe(Boolean(next))}
          label="Assignee: You"
        />
      </PopoverContent>
    </Popover>
  );
}
