import { Icon } from "@makeplane/propel/components/icon";
import { PillButton } from "@makeplane/propel/components/pill";
import { Tag } from "lucide-react";

export default function BasicDemo() {
  return <PillButton magnitude="md" startIcon={<Icon icon={Tag} />} label="Design" />;
}
