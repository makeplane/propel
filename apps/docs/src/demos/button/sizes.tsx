import { Button } from "@makeplane/propel/components/button";

export default function SizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button label="Small" variant="primary" size="sm" fillType="hug" />
      <Button label="Medium" variant="primary" size="md" fillType="hug" />
      <Button label="Large" variant="primary" size="lg" fillType="hug" />
      <Button label="Extra large" variant="primary" size="xl" fillType="hug" />
    </div>
  );
}
