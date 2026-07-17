import { AnchorButton } from "@makeplane/propel/components/anchor-button";
import { Icon } from "@makeplane/propel/components/icon";
import { ArrowUpRight, Plus } from "lucide-react";

export default function WithIconsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <AnchorButton
        label="Add condition"
        prominence="primary"
        magnitude="md"
        startIcon={<Icon icon={Plus} />}
      />
      <AnchorButton
        label="View docs"
        prominence="secondary"
        magnitude="md"
        endIcon={<Icon icon={ArrowUpRight} />}
      />
    </div>
  );
}
