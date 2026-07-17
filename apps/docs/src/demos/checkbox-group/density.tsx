import { Checkbox } from "@makeplane/propel/components/checkbox";
import { CheckboxGroup } from "@makeplane/propel/components/checkbox-group";
import * as React from "react";

export default function DensityDemo() {
  return (
    <div className="flex flex-wrap items-start gap-10">
      <CheckboxGroup density="comfortable" defaultValue={["daily"]} aria-label="Comfortable">
        <Checkbox value="daily" label="Daily" />
        <Checkbox value="weekly" label="Weekly" />
      </CheckboxGroup>
      <CheckboxGroup density="compact" defaultValue={["daily"]} aria-label="Compact">
        <Checkbox value="daily" label="Daily" />
        <Checkbox value="weekly" label="Weekly" />
      </CheckboxGroup>
    </div>
  );
}
