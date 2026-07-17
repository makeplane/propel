import { ScrollArea } from "@makeplane/propel/components/scroll-area";

const MAGNITUDES = ["thin", "standard"] as const;

const LINES = Array.from({ length: 30 }, (_, i) => `Line ${i + 1} of the scrollable content.`);

export default function MagnitudesDemo() {
  // Both scrollbar gutter steps side by side: `thin` — 12 px gutter, for dense UI like
  // menus and pickers; `standard` — 16 px gutter, for roomier panels. Shown with
  // `visibility="always"` so both rails are visible at rest.
  return (
    <div style={{ display: "flex", gap: "0.75rem" }}>
      {MAGNITUDES.map((magnitude) => (
        <div key={magnitude} style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
          <p>{magnitude}</p>
          <div
            style={{ display: "flex", flexDirection: "column", height: "14rem", width: "12rem" }}
          >
            <ScrollArea orientation="vertical" visibility="always" magnitude={magnitude}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  padding: "0.75rem",
                }}
              >
                {LINES.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      ))}
    </div>
  );
}
