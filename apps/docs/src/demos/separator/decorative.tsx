import { Separator } from "@makeplane/propel/components/separator";

export default function DecorativeDemo() {
  return (
    <div className="flex w-72 flex-col gap-3 text-body-sm-regular text-secondary">
      Draft the Q3 roadmap
      <Separator orientation="horizontal" decorative />
      Review workspace members
    </div>
  );
}
