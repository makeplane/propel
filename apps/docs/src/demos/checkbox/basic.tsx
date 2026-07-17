import { Checkbox } from "@makeplane/propel/components/checkbox";
import * as React from "react";

export default function BasicDemo() {
  const [checked, setChecked] = React.useState(true);

  return (
    <Checkbox label="Send me product updates" checked={checked} onCheckedChange={setChecked} />
  );
}
