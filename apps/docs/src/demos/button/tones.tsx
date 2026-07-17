import { Button } from "@makeplane/propel/components/button";

export default function TonesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        label="Save changes"
        prominence="primary"
        tone="neutral"
        magnitude="md"
        sizing="hug"
      />
      <Button
        label="Delete project"
        prominence="primary"
        tone="danger"
        magnitude="md"
        sizing="hug"
      />
      <Button
        label="Remove member"
        prominence="secondary"
        tone="danger"
        magnitude="md"
        sizing="hug"
      />
    </div>
  );
}
