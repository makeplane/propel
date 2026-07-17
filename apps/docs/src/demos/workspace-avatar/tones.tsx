import { AVATAR_TONES, WorkspaceAvatar } from "@makeplane/propel/components/workspace-avatar";

export default function TonesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {AVATAR_TONES.map((tone) => (
        <WorkspaceAvatar
          key={tone}
          magnitude="lg"
          tone={tone}
          alt="Plane workspace"
          fallback={tone[0]?.toUpperCase()}
        />
      ))}
    </div>
  );
}
