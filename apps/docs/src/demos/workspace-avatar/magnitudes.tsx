import {
  WorkspaceAvatar,
  type WorkspaceAvatarMagnitude,
} from "@makeplane/propel/components/workspace-avatar";

const MAGNITUDES: WorkspaceAvatarMagnitude[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <WorkspaceAvatar
          key={magnitude}
          magnitude={magnitude}
          alt="Plane workspace"
          fallback="PV"
        />
      ))}
    </div>
  );
}
