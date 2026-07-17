import { ScrollArea } from "@makeplane/propel/components/scroll-area";

const ACTIVITY = Array.from(
  { length: 24 },
  (_, i) => `Astra updated the project roadmap — item ${i + 1}`,
);

export default function BasicDemo() {
  // ScrollArea fills its parent, so it needs a height-constrained flex column to
  // bound and scroll within. Inline styles keep the demo self-contained.
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "16rem", width: "18rem" }}>
      <ScrollArea orientation="vertical" visibility="auto" magnitude="thin">
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "0.75rem" }}
        >
          {ACTIVITY.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
