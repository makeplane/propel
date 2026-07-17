import { Dialog, DialogContent } from "@makeplane/propel/components/dialog";
import { Shortcut } from "@makeplane/propel/components/shortcut";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { COMPONENT_GROUPS, GETTING_STARTED } from "~/lib/components-registry";

type Entry = { href: string; title: string; description: string; group: string };

const ENTRIES: Entry[] = [
  ...GETTING_STARTED.map((d) => ({ ...d, group: "Getting started" })),
  ...COMPONENT_GROUPS.flatMap((g) =>
    g.items.map((c) => ({
      href: `/components/${c.slug}`,
      title: c.title,
      description: c.description,
      group: g.label,
    })),
  ),
];

function matches(entry: Entry, query: string): boolean {
  const haystack = `${entry.title} ${entry.description} ${entry.group}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

// ⌘K command palette over the docs registry: 64 metadata entries filtered
// client-side — instant, no index build, works in dev and prod alike.
export default function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(
    () => (query.trim() ? ENTRIES.filter((e) => matches(e, query)) : ENTRIES),
    [query],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      window.location.assign(results[active].href);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
        className="flex items-center gap-2 rounded-md border border-subtle px-2.5 py-1 text-body-sm-regular text-tertiary hover:bg-layer-transparent-hover hover:text-secondary focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-1 focus-visible:outline-none"
      >
        <Search aria-hidden className="size-3.5" />
        <span className="hidden md:inline">Search</span>
        <Shortcut keys="⌘K" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent magnitude="sm" aria-label="Search documentation">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 border-b border-subtle px-4 py-3">
              <Search aria-hidden className="size-4 shrink-0 text-icon-tertiary" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search components…"
                aria-label="Search components"
                role="combobox"
                aria-expanded="true"
                aria-controls="docs-search-results"
                aria-activedescendant={results[active] ? `docs-search-option-${active}` : undefined}
                className="w-full bg-transparent text-body-md-regular text-primary outline-none placeholder:text-placeholder"
              />
            </div>
            <ul
              ref={listRef}
              id="docs-search-results"
              role="listbox"
              aria-label="Search results"
              className="scrollbar-sm max-h-80 overflow-y-auto p-2"
            >
              {results.length === 0 ? (
                <li className="px-3 py-6 text-center text-body-sm-regular text-tertiary">
                  No results for “{query}”
                </li>
              ) : (
                results.map((entry, index) => (
                  <li key={entry.href} role="presentation">
                    <a
                      id={`docs-search-option-${index}`}
                      role="option"
                      aria-selected={index === active}
                      data-index={index}
                      href={entry.href}
                      onMouseMove={() => setActive(index)}
                      className={`flex items-baseline justify-between gap-3 rounded-md px-3 py-2 ${
                        index === active ? "bg-layer-transparent-selected" : ""
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="text-body-sm-medium text-primary">{entry.title}</span>
                        <span className="ml-2 hidden text-body-xs-regular text-tertiary sm:inline">
                          {entry.description}
                        </span>
                      </span>
                      <span className="shrink-0 text-caption-md-medium text-tertiary">
                        {entry.group}
                      </span>
                    </a>
                  </li>
                ))
              )}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
