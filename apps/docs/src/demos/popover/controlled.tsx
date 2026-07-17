import { Button } from "@makeplane/propel/components/button";
import { Checkbox } from "@makeplane/propel/components/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@makeplane/propel/components/popover";
import * as React from "react";

export default function ControlledDemo() {
  const [open, setOpen] = React.useState(false);
  const [showSubItems, setShowSubItems] = React.useState(true);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Popover open={open} onOpenChange={(next) => setOpen(next)}>
        <Button
          sizing="hug"
          prominence="secondary"
          tone="neutral"
          magnitude="xl"
          render={<PopoverTrigger />}
          label="Display"
        />
        <PopoverContent side="bottom" align="start" sizing="md" aria-label="Display options">
          <Checkbox
            sizing="fill"
            checked={showSubItems}
            onCheckedChange={(next) => setShowSubItems(Boolean(next))}
            label="Show sub-work items"
          />
        </PopoverContent>
      </Popover>
      <Button
        sizing="hug"
        prominence="tertiary"
        tone="neutral"
        magnitude="xl"
        onClick={() => setOpen((prev) => !prev)}
        label={open ? "Close panel" : "Open panel"}
      />
    </div>
  );
}
