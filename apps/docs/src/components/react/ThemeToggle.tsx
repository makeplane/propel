import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Mode = "light" | "dark" | "system";

const ORDER: Mode[] = ["light", "dark", "system"];
const STORAGE_KEY = "propel-docs-theme";

// Mirrors the pre-paint script in BaseLayout: explicit light/dark from storage,
// otherwise the OS scheme; prefers-contrast upgrades to the -contrast variants.
function apply(mode: Mode) {
  const dark =
    mode === "dark" || (mode === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  const contrast = matchMedia("(prefers-contrast: more)").matches;
  document.documentElement.dataset.theme =
    (dark ? "dark" : "light") + (contrast ? "-contrast" : "");
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage unavailable (private mode) — stay on system */
    }
    setMode(stored === "light" || stored === "dark" ? stored : "system");
  }, []);

  useEffect(() => {
    if (mode !== "system") return;
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mode]);

  const next: Mode = mode ? ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length] : "dark";
  const glyph = mode === "dark" ? Moon : mode === "system" ? Monitor : Sun;

  return (
    <IconButton
      prominence="ghost"
      tone="neutral"
      magnitude="lg"
      aria-label={`Theme: ${mode ?? "light"}. Switch to ${next}`}
      icon={<Icon icon={glyph} />}
      onClick={() => {
        try {
          if (next === "system") localStorage.removeItem(STORAGE_KEY);
          else localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* persistence is best-effort */
        }
        setMode(next);
        apply(next);
      }}
    />
  );
}
