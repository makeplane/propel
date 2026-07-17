import { Meter } from "@makeplane/propel/components/meter";

export default function LevelsDemo() {
  return (
    <div className="flex flex-col gap-4">
      {[15, 50, 90].map((value) => (
        <Meter key={value} value={value} label="Storage used" />
      ))}
    </div>
  );
}
