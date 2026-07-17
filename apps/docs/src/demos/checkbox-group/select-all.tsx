import { Checkbox } from "@makeplane/propel/components/checkbox";
import { CheckboxGroup } from "@makeplane/propel/components/checkbox-group";
import * as React from "react";

const PROTOCOLS = ["http", "https", "ssh"];

export default function SelectAllDemo() {
  return (
    <CheckboxGroup
      density="comfortable"
      defaultValue={["https"]}
      allValues={PROTOCOLS}
      aria-label="Allowed protocols"
    >
      <Checkbox parent label="Select all" />
      <Checkbox value="http" label="HTTP" />
      <Checkbox value="https" label="HTTPS" />
      <Checkbox value="ssh" label="SSH" />
    </CheckboxGroup>
  );
}
