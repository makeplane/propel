import { AnchorButton } from "@makeplane/propel/components/anchor-button";

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <AnchorButton label="Show more" prominence="primary" magnitude="sm" />
      <AnchorButton label="Show more" prominence="primary" magnitude="md" />
      <AnchorButton label="Show more" prominence="primary" magnitude="lg" />
      <AnchorButton label="Show more" prominence="primary" magnitude="xl" />
    </div>
  );
}
