import { AnchorButton } from "@makeplane/propel/components/anchor-button";

export default function SizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <AnchorButton label="Show more" variant="primary" size="sm" />
      <AnchorButton label="Show more" variant="primary" size="md" />
      <AnchorButton label="Show more" variant="primary" size="lg" />
      <AnchorButton label="Show more" variant="primary" size="xl" />
    </div>
  );
}
