import { Badge } from "@makeplane/propel/components/badge";
import { Icon } from "@makeplane/propel/components/icon";
import { Check, Sparkles } from "lucide-react";

export default function WithIconDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge tone="success" magnitude="md" startIcon={<Icon icon={Check} />} label="Done" />
      <Badge tone="brand" magnitude="md" endIcon={<Icon icon={Sparkles} />} label="Pro" />
    </div>
  );
}
