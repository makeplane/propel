import { SwitchField } from "@makeplane/propel/components/switch-field";
import * as React from "react";

export default function ControlledDemo() {
  const [checked, setChecked] = React.useState(false);

  return (
    <SwitchField
      name="weeklyDigest"
      label="Weekly project digest"
      description="A Monday summary of activity across your projects."
      magnitude="md"
      checked={checked}
      onCheckedChange={setChecked}
      hint={checked ? "You will receive the digest every Monday." : "Digest emails are paused."}
    />
  );
}
