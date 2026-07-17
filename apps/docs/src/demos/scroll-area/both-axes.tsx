import { ScrollArea } from "@makeplane/propel/components/scroll-area";

const LINES = Array.from(
  { length: 30 },
  (_, i) => `Line ${i + 1} of wide content that overflows horizontally as well as down.`,
);

export default function BothAxesDemo() {
  // Both axes overflow: a vertical and a horizontal scrollbar, each shown on demand,
  // plus the corner where they meet. The content is wider and taller than the parent.
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "16rem", width: "18rem" }}>
      <ScrollArea orientation="both" visibility="auto" magnitude="thin">
        <div
          style={{
            display: "flex",
            width: "40rem",
            flexDirection: "column",
            gap: "0.5rem",
            padding: "0.75rem",
          }}
        >
          {LINES.map((line) => (
            <p key={line} style={{ whiteSpace: "nowrap" }}>
              {line}
            </p>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
