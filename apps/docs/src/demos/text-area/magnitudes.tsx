import { TextArea, TextAreaGroup } from "@makeplane/propel/components/text-area";

const MAGNITUDES = ["sm", "md", "lg", "xl"] as const;

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-col gap-4">
      {MAGNITUDES.map((magnitude) => (
        <TextAreaGroup key={magnitude}>
          <TextArea
            magnitude={magnitude}
            surface="field"
            resize="vertical"
            rows={2}
            aria-label={`Comment (${magnitude})`}
            defaultValue={`The ${magnitude} magnitude sizes the value text.`}
          />
        </TextAreaGroup>
      ))}
    </div>
  );
}
