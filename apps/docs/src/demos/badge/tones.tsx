import { Badge, type BadgeTone } from "@makeplane/propel/components/badge";

const TONES: BadgeTone[] = [
  "neutral",
  "grey",
  "brand",
  "info",
  "indigo",
  "success",
  "emerald",
  "warning",
  "yellow",
  "danger",
  "crimson",
  "orange",
];

export default function TonesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {TONES.map((tone) => (
        <Badge key={tone} tone={tone} magnitude="md" label={tone} />
      ))}
    </div>
  );
}
