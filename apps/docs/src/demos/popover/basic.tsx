import { Button } from "@makeplane/propel/components/button";
import { Checkbox } from "@makeplane/propel/components/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@makeplane/propel/components/popover";
import * as React from "react";

export default function BasicDemo() {
  const [showSubItems, setShowSubItems] = React.useState(true);
  const [showEmptyGroups, setShowEmptyGroups] = React.useState(false);

  return (
    <Popover>
      <Button
        sizing="hug"
        prominence="secondary"
        tone="neutral"
        magnitude="xl"
        render={<PopoverTrigger />}
        label="Options"
      />
      <PopoverContent side="bottom" align="start" sizing="md" aria-label="Options">
        <Checkbox
          sizing="fill"
          checked={showSubItems}
          onCheckedChange={(next) => setShowSubItems(Boolean(next))}
          label="Show sub-work items"
        />
        <Checkbox
          sizing="fill"
          checked={showEmptyGroups}
          onCheckedChange={(next) => setShowEmptyGroups(Boolean(next))}
          label="Show empty groups"
        />
      </PopoverContent>
    </Popover>
  );
}
