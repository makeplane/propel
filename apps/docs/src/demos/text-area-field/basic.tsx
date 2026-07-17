import { TextAreaField } from "@makeplane/propel/components/text-area-field";

export default function BasicDemo() {
  return (
    <TextAreaField
      magnitude="md"
      resize="vertical"
      label="Comment"
      placeholder="Leave a comment..."
      description="Share your thoughts on the proposal."
      hint="Markdown is supported."
    />
  );
}
