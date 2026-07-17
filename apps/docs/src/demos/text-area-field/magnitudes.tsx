import { TextAreaField } from "@makeplane/propel/components/text-area-field";

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-col items-start gap-4">
      <TextAreaField magnitude="md" resize="vertical" label="md" placeholder="Leave a comment..." />
      <TextAreaField magnitude="lg" resize="vertical" label="lg" placeholder="Leave a comment..." />
      <TextAreaField magnitude="xl" resize="vertical" label="xl" placeholder="Leave a comment..." />
    </div>
  );
}
