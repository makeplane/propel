import { Avatar } from "@makeplane/propel/components/avatar";
import { AvatarGroup, type AvatarGroupMagnitude } from "@makeplane/propel/components/avatar-group";

const MAGNITUDES: AvatarGroupMagnitude[] = ["2xs", "xs", "sm"];

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {MAGNITUDES.map((magnitude) => (
        <AvatarGroup key={magnitude} magnitude={magnitude}>
          <Avatar alt="Ada Lovelace" fallback="AL" src="https://i.pravatar.cc/64?img=47" />
          <Avatar alt="Grace Hopper" fallback="GH" src="https://i.pravatar.cc/64?img=32" />
          <Avatar alt="Linus Torvalds" fallback="LT" />
        </AvatarGroup>
      ))}
    </div>
  );
}
