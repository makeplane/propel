import { Button } from "@makeplane/propel/components/button";

export default function LoadingDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        label="Saving"
        prominence="primary"
        tone="neutral"
        magnitude="md"
        sizing="hug"
        loading
      />
      <Button
        label="Inviting member"
        prominence="secondary"
        tone="neutral"
        magnitude="md"
        sizing="hug"
        loading
      />
      <Button
        label="Please wait"
        prominence="tertiary"
        tone="neutral"
        magnitude="md"
        sizing="hug"
        loading
      />
    </div>
  );
}
