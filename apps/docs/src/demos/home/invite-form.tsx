import { Button } from "@makeplane/propel/components/button";
import { CheckboxField } from "@makeplane/propel/components/checkbox-field";
import { Icon } from "@makeplane/propel/components/icon";
import { InputField } from "@makeplane/propel/components/input-field";
import { Mail } from "lucide-react";

export default function InviteFormDemo() {
  return (
    <form
      className="flex w-full max-w-64 flex-col gap-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <InputField
        magnitude="md"
        orientation="vertical"
        label="Email address"
        placeholder="teammate@acme.dev"
        startIcon={<Icon icon={Mail} tint="placeholder" />}
      />
      <CheckboxField
        name="allProjects"
        value="enabled"
        label="Add to all projects"
        magnitude="md"
        description="They can be removed from a project later."
        defaultChecked
      />
      <Button type="submit" label="Send invite" variant="secondary" size="md" fillType="fill" />
    </form>
  );
}
