import { WorkspaceAvatar } from "@makeplane/propel/components/workspace-avatar";

const WORKSPACES = [
  { alt: "Plane", fallback: "P" },
  { alt: "Acme Corp", fallback: "A" },
  { alt: "Globex", fallback: "G" },
  { alt: "Initech", fallback: "I" },
  { alt: "Umbrella", fallback: "U" },
  { alt: "Hooli", fallback: "H" },
];

export default function TonesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {WORKSPACES.map(({ alt, fallback }) => (
        <WorkspaceAvatar key={alt} magnitude="lg" alt={alt} fallback={fallback} />
      ))}
    </div>
  );
}
