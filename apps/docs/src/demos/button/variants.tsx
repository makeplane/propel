import { Button } from "@makeplane/propel/components/button";

export default function VariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button label="Primary" variant="primary" size="md" fillType="hug" />
      <Button label="Secondary" variant="secondary" size="md" fillType="hug" />
      <Button label="Tertiary" variant="tertiary" size="md" fillType="hug" />
      <Button label="Ghost" variant="ghost" size="md" fillType="hug" />
      <Button label="Danger" variant="danger" size="md" fillType="hug" />
      <Button label="Danger outline" variant="danger-outline" size="md" fillType="hug" />
    </div>
  );
}
