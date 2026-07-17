import { ComboboxField } from "@makeplane/propel/components/combobox-field";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { ChevronsUpDown, X } from "lucide-react";

const REGIONS = ["us-central-1", "us-east-1", "eu-central-1", "ap-west-1"];

export default function BasicDemo() {
  return (
    <ComboboxField
      name="region"
      label="Region"
      description="Filter the deployment region."
      magnitude="md"
      items={REGIONS}
      placeholder="e.g. eu-central-1"
      empty="No regions found"
      clear={
        <IconButton
          prominence="ghost"
          tone="neutral"
          magnitude="md"
          aria-label="Clear region"
          icon={<Icon icon={X} />}
        />
      }
      trigger={
        <IconButton
          prominence="ghost"
          tone="neutral"
          magnitude="md"
          aria-label="Open region"
          icon={<Icon icon={ChevronsUpDown} />}
        />
      }
    />
  );
}
