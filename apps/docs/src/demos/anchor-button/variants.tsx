import { AnchorButton } from "@makeplane/propel/components/anchor-button";

export default function VariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <AnchorButton label="Invite members" variant="primary" size="md" />
      <AnchorButton label="Skip for now" variant="secondary" size="md" />
    </div>
  );
}
