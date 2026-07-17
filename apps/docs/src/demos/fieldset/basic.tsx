import { Fieldset } from "@makeplane/propel/components/fieldset";
import { InputField } from "@makeplane/propel/components/input-field";

export default function BasicDemo() {
  return (
    <Fieldset legend="Workspace details" legendMagnitude="md" bordered={false}>
      <InputField
        magnitude="md"
        orientation="vertical"
        name="name"
        label="Name"
        placeholder="Acme Inc."
      />
      <InputField
        magnitude="md"
        orientation="vertical"
        name="slug"
        label="URL slug"
        placeholder="acme"
      />
    </Fieldset>
  );
}
