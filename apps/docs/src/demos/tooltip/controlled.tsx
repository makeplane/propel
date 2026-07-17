import { Button } from "@makeplane/propel/components/button";
import { Tooltip } from "@makeplane/propel/components/tooltip";
import * as React from "react";

export default function ControlledDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tooltip label="Copies the invite link" open={open} onOpenChange={setOpen}>
        <Button
          label="Copy link"
          prominence="secondary"
          tone="neutral"
          magnitude="md"
          sizing="hug"
        />
      </Tooltip>
      <Button
        label="Show hint"
        prominence="primary"
        tone="neutral"
        magnitude="md"
        sizing="hug"
        onClick={() => setOpen(true)}
      />
    </div>
  );
}
