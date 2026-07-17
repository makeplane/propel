import { AnchorButton } from "@makeplane/propel/components/anchor-button";

export default function ProminencesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <AnchorButton label="Invite members" prominence="primary" magnitude="md" />
      <AnchorButton label="Skip for now" prominence="secondary" magnitude="md" />
    </div>
  );
}
