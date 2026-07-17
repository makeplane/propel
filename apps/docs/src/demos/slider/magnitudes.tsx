import { Slider } from "@makeplane/propel/components/slider";

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Slider label="sm" magnitude="sm" defaultValue={40} min={0} max={100} step={1} />
      <Slider label="md" magnitude="md" defaultValue={40} min={0} max={100} step={1} />
      <Slider label="lg" magnitude="lg" defaultValue={40} min={0} max={100} step={1} />
    </div>
  );
}
