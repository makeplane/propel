import { TextAreaField } from "@makeplane/propel/components/text-area-field";

export default function InvalidDemo() {
  return (
    <TextAreaField
      magnitude="md"
      resize="vertical"
      label="Comment"
      defaultValue="No"
      error="Add a little more detail."
      required
    />
  );
}
