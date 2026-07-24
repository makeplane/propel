import { Button } from "@makeplane/propel/components/button";

export default function LoadingDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button label="Saving" variant="primary" size="md" fillType="hug" loading />
      <Button label="Inviting member" variant="secondary" size="md" fillType="hug" loading />
      <Button label="Please wait" variant="tertiary" size="md" fillType="hug" loading />
    </div>
  );
}
