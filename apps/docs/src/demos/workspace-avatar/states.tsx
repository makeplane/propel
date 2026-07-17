import { WorkspaceAvatar } from "@makeplane/propel/components/workspace-avatar";

export default function StatesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <WorkspaceAvatar
        magnitude="lg"
        alt="Plane workspace"
        fallback="PV"
        src="https://avatars.githubusercontent.com/u/73642778?s=128"
      />
      <WorkspaceAvatar magnitude="lg" alt="Plane workspace" fallback="PV" />
    </div>
  );
}
