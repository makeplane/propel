import { Avatar, AVATAR_TONES } from "@makeplane/propel/components/avatar";

export default function TonesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {AVATAR_TONES.map((tone) => (
        <Avatar key={tone} magnitude="lg" tone={tone} fallback={tone[0]?.toUpperCase()} />
      ))}
    </div>
  );
}
