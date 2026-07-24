import { AnchorButton } from "@makeplane/propel/components/anchor-button";
import { Icon } from "@makeplane/propel/components/icon";
import { ArrowUpRight, Plus } from "lucide-react";

export default function WithIconsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <AnchorButton label="Add condition" variant="primary" size="md" icon={<Icon icon={Plus} />} />
      <AnchorButton
        label="View docs"
        variant="secondary"
        size="md"
        icon={<Icon icon={ArrowUpRight} />}
        iconPosition="end"
      />
    </div>
  );
}
