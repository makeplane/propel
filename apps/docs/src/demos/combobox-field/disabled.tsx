import { ComboboxField } from "@makeplane/propel/components/combobox-field";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { ChevronsUpDown, X } from "lucide-react";

const REGIONS = ["us-central-1", "us-east-1", "eu-central-1", "ap-west-1"];

export default function DisabledDemo() {
  return (
    <ComboboxField
      name="region"
      label="Region"
      description="Filter the deployment region."
      magnitude="md"
      disabled
      items={REGIONS}
      placeholder="e.g. eu-central-1"
      empty="No regions found"
      clear={
        <IconButton variant="ghost" size="md" aria-label="Clear region" icon={<Icon icon={X} />} />
      }
      trigger={
        <IconButton
          variant="ghost"
          size="md"
          aria-label="Open region"
          icon={<Icon icon={ChevronsUpDown} />}
        />
      }
    />
  );
}
