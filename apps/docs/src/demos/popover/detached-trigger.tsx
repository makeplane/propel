import { Button } from "@makeplane/propel/components/button";
import { Checkbox } from "@makeplane/propel/components/checkbox";
import {
  createPopoverHandle,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@makeplane/propel/components/popover";
import * as React from "react";

// A handle created outside the React tree links a detached trigger to its popover.
const displayPopoverHandle = createPopoverHandle();

export default function DetachedTriggerDemo() {
  const [showSubItems, setShowSubItems] = React.useState(true);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* The trigger lives outside the Popover, linked through the shared handle. */}
      <Button
        sizing="hug"
        prominence="secondary"
        tone="neutral"
        magnitude="xl"
        render={<PopoverTrigger handle={displayPopoverHandle} />}
        label="Display"
      />
      {/* The popover is declared separately and associated by `handle`. */}
      <Popover handle={displayPopoverHandle}>
        <PopoverContent side="bottom" align="end" sizing="md" aria-label="Display options">
          <Checkbox
            sizing="fill"
            checked={showSubItems}
            onCheckedChange={(next) => setShowSubItems(Boolean(next))}
            label="Show sub-work items"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
