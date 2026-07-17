import { Separator } from "@makeplane/propel/components/separator";

export default function VerticalDemo() {
  return (
    <div className="flex h-6 items-center gap-3 text-body-sm-regular text-secondary">
      Overview
      <Separator orientation="vertical" decorative={false} />
      Members
      <Separator orientation="vertical" decorative={false} />
      Settings
    </div>
  );
}
