import { ScrollArea } from "@makeplane/propel/components/scroll-area";

const MEMBERS = Array.from({ length: 16 }, (_, i) => `Teammate ${i + 1}`);

export default function HorizontalDemo() {
  // Horizontal overflow only: a single horizontal scrollbar, shown on demand. The
  // content is a `w-max` row so it overflows sideways within the fixed-width parent.
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "9rem", width: "18rem" }}>
      <ScrollArea orientation="horizontal" visibility="auto" magnitude="thin">
        <div style={{ display: "flex", width: "max-content", gap: "0.75rem", padding: "0.75rem" }}>
          {MEMBERS.map((member) => (
            <div
              key={member}
              style={{
                display: "flex",
                height: "4rem",
                width: "9rem",
                flexShrink: 0,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0.375rem",
                background: "var(--color-layer-2)",
              }}
            >
              {member}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
