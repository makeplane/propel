import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { Plus } from "lucide-react";

export default function BasicDemo() {
  return (
    <IconButton
      prominence="primary"
      tone="neutral"
      magnitude="md"
      aria-label="Add item"
      icon={<Icon icon={Plus} />}
    />
  );
}
