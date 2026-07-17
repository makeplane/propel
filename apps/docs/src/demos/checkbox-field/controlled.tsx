import { CheckboxField } from "@makeplane/propel/components/checkbox-field";
import * as React from "react";

export default function ControlledDemo() {
  const [checked, setChecked] = React.useState(false);

  return (
    <CheckboxField
      name="autoArchive"
      value="enabled"
      label="Auto-archive completed work items"
      magnitude="md"
      description="Move items to the archive one week after they are marked done."
      hint={checked ? "Archiving is on." : "Archiving is off."}
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
}
