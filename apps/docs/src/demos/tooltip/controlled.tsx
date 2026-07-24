import { Button } from "@makeplane/propel/components/button";
import { Tooltip } from "@makeplane/propel/components/tooltip";
import * as React from "react";

export default function ControlledDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tooltip label="Copies the invite link" open={open} onOpenChange={setOpen}>
        <Button label="Copy link" variant="secondary" size="md" fillType="hug" />
      </Tooltip>
      <Button
        label="Show hint"
        variant="primary"
        size="md"
        fillType="hug"
        onClick={() => setOpen(true)}
      />
    </div>
  );
}
