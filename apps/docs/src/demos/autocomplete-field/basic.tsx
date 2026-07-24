import { AutocompleteField } from "@makeplane/propel/components/autocomplete-field";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { ChevronsUpDown, X } from "lucide-react";

const IMAGES = ["nginx:1.29-alpine", "node:22-slim", "postgres:18", "redis:8.2.2-alpine"];

export default function BasicDemo() {
  return (
    <AutocompleteField
      name="containerImage"
      label="Container image"
      description="Type or choose an image tag."
      magnitude="md"
      items={IMAGES}
      placeholder="e.g. node:22-slim"
      empty="No images found"
      clear={
        <IconButton
          variant="ghost"
          size="md"
          aria-label="Clear container image"
          icon={<Icon icon={X} />}
        />
      }
      trigger={
        <IconButton
          variant="ghost"
          size="md"
          aria-label="Open container image"
          icon={<Icon icon={ChevronsUpDown} />}
        />
      }
    />
  );
}
