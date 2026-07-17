import { Button } from "@makeplane/propel/components/button";

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button label="Small" prominence="primary" tone="neutral" magnitude="sm" sizing="hug" />
      <Button label="Medium" prominence="primary" tone="neutral" magnitude="md" sizing="hug" />
      <Button label="Large" prominence="primary" tone="neutral" magnitude="lg" sizing="hug" />
      <Button label="Extra large" prominence="primary" tone="neutral" magnitude="xl" sizing="hug" />
    </div>
  );
}
