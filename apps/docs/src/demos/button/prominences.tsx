import { Button } from "@makeplane/propel/components/button";

export default function ProminencesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button label="Primary" prominence="primary" tone="neutral" magnitude="md" sizing="hug" />
      <Button label="Secondary" prominence="secondary" tone="neutral" magnitude="md" sizing="hug" />
      <Button label="Tertiary" prominence="tertiary" tone="neutral" magnitude="md" sizing="hug" />
      <Button label="Ghost" prominence="ghost" tone="neutral" magnitude="md" sizing="hug" />
    </div>
  );
}
