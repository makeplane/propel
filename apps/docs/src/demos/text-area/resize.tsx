import { TextArea, TextAreaGroup } from "@makeplane/propel/components/text-area";

const RESIZES = ["none", "vertical", "both"] as const;

const RESIZE_COPY = {
  none: "No resize handle — the textarea keeps its size.",
  vertical: "Drag the corner handle to grow the textarea vertically.",
  both: "Drag the corner handle to grow the textarea in both directions.",
} as const;

export default function ResizeDemo() {
  return (
    <div className="flex flex-col gap-4">
      {RESIZES.map((resize) => (
        <TextAreaGroup key={resize}>
          <TextArea
            magnitude="md"
            surface="field"
            resize={resize}
            rows={2}
            aria-label={`Comment (resize ${resize})`}
            defaultValue={RESIZE_COPY[resize]}
          />
        </TextAreaGroup>
      ))}
    </div>
  );
}
