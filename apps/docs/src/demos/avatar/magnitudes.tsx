import { Avatar, type AvatarMagnitude } from "@makeplane/propel/components/avatar";

const MAGNITUDES: AvatarMagnitude[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Avatar key={magnitude} magnitude={magnitude} alt="Ada Lovelace" fallback="AL" />
      ))}
    </div>
  );
}
