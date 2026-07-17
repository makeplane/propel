import { Switch, type SwitchMagnitude } from "@makeplane/propel/components/switch";

const MAGNITUDES: SwitchMagnitude[] = ["lg", "md", "sm"];

export default function SizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Switch
          key={magnitude}
          magnitude={magnitude}
          defaultChecked
          aria-label={`Size ${magnitude}`}
        />
      ))}
    </div>
  );
}
