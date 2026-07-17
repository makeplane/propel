import { TextArea, TextAreaGroup } from "@makeplane/propel/components/text-area";

export default function BasicDemo() {
  return (
    <TextAreaGroup>
      <TextArea
        magnitude="md"
        surface="field"
        resize="vertical"
        aria-label="Comment"
        placeholder="Leave a comment..."
        rows={4}
      />
    </TextAreaGroup>
  );
}
