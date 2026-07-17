import {
  AutocompleteField,
  type FieldMagnitude,
} from "@makeplane/propel/components/autocomplete-field";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { ChevronsUpDown, X } from "lucide-react";

const IMAGES = ["nginx:1.29-alpine", "node:22-slim", "postgres:18", "redis:8.2.2-alpine"];

const MAGNITUDES: FieldMagnitude[] = ["md", "lg", "xl"];

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-col gap-4">
      {MAGNITUDES.map((magnitude) => (
        <AutocompleteField
          key={magnitude}
          name="containerImage"
          label={magnitude}
          description="Type or choose an image tag."
          magnitude={magnitude}
          items={IMAGES}
          placeholder="e.g. node:22-slim"
          empty="No images found"
          clear={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude="md"
              aria-label="Clear container image"
              icon={<Icon icon={X} />}
            />
          }
          trigger={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude="md"
              aria-label="Open container image"
              icon={<Icon icon={ChevronsUpDown} />}
            />
          }
        />
      ))}
    </div>
  );
}
