import { WorkspaceAvatar } from "@makeplane/propel/components/workspace-avatar";

export default function BasicDemo() {
  return (
    <WorkspaceAvatar
      magnitude="md"
      alt="Plane workspace"
      fallback="PV"
      src="https://avatars.githubusercontent.com/u/73642778?s=128"
    />
  );
}
