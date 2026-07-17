import { ScrollArea } from "@makeplane/propel/components/scroll-area";

const LINES = Array.from({ length: 30 }, (_, i) => `Line ${i + 1} of the scrollable content.`);

export default function AlwaysVisibleDemo() {
  // `visibility="always"` keeps the scrollbar permanently visible instead of revealing
  // it on hover/scroll — useful for embedded editors or data tables where users expect
  // a persistent rail. Paired here with the roomier `standard` gutter.
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "16rem", width: "18rem" }}>
      <ScrollArea orientation="vertical" visibility="always" magnitude="standard">
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "0.75rem" }}
        >
          {LINES.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
