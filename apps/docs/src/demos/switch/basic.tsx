import { Switch } from "@makeplane/propel/components/switch";
import * as React from "react";

export default function BasicDemo() {
  const [checked, setChecked] = React.useState(true);

  return (
    <Switch
      magnitude="md"
      aria-label="Enable notifications"
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
}
