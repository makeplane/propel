import { DirectionProvider } from "@base-ui/react/direction-provider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { useLayoutEffect } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Checkbox } from "../checkbox/index";
import { Radio, RadioGroup } from "../radio/index";
import { Popover, PopoverContent, PopoverTrigger } from "./index";

const meta = {
  title: "Components/Popover",
  component: Popover,
  // Popover is a compound component; document the trigger + content parts alongside
  // the root so their props appear in the args table and the relationship is recorded.
  subcomponents: { PopoverTrigger, PopoverContent },
  tags: ["ai-generated"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

// A plain trigger button styled with propel tokens — the popover itself doesn't ship a
// trigger style, so stories provide one (the same one the Dropdown stories use).
const triggerClass =
  "inline-flex h-8 items-center gap-1.5 rounded-md border border-subtle bg-surface-1 px-3 text-13 text-secondary outline-none";

// ---------------------------------------------------------------------------
// Demo-only fixtures. These settings-panel controls (a selectable pill, plain
// section heading) aren't propel primitives — propel has no "chip"/"pills"
// component yet — they're minimal local stand-ins, flagged in the PR.
// ---------------------------------------------------------------------------

// A section heading inside a settings panel.
function PanelLabel({ children }: { children: React.ReactNode }) {
  return <div className="px-2 py-1.5 text-12 text-tertiary">{children}</div>;
}

// A thin divider between panel sections (matches the dropdown's separator).
function PanelSeparator() {
  return <div className="-mx-1 my-1 border-t border-subtle" />;
}

// A selectable display-property pill matching Figma `56-366` (default / hover /
// selected). NOTE: propel has no "chip" component yet — minimal demo-local stand-in.
function DisplayPill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`cursor-pointer rounded-md border px-2 py-1 text-13 outline-none ${
        selected
          ? "border-subtle-1 bg-layer-2-active text-primary shadow-raised-100"
          : "border-subtle-1 bg-layer-2 text-tertiary hover:border-subtle hover:bg-layer-2-hover hover:text-secondary hover:shadow-raised-100"
      }`}
    >
      {label}
    </button>
  );
}

// A row whose leading control is a propel Radio, for single-select sort lists.
// Sized to match a DropdownItem (34px tall, `rounded-md`) so the panel reads like
// the dropdown menu.
function PanelRadioRow({ value, label }: { value: string; label: string }) {
  return (
    <label className="flex h-[34px] cursor-pointer items-center gap-2 rounded-md px-2 text-13 text-secondary hover:bg-layer-transparent-hover">
      <Radio value={value} />
      <span className="min-w-0 flex-1 truncate">{label}</span>
    </label>
  );
}

/**
 * The default popover: a trigger plus a generic floating panel. The panel hosts arbitrary
 * content (here a couple of checkbox toggles) — it is NOT a `role="menu"`, so these
 * controls are valid children. Open it by clicking the trigger; dismiss with `Esc`, an
 * outside click, or by toggling the trigger again.
 */
export const Default: Story = {
  render: function DefaultStory() {
    const [toggles, setToggles] = React.useState<Record<string, boolean>>({ sub: true });
    return (
      <Popover>
        <PopoverTrigger render={<button type="button" className={triggerClass} />}>
          Options
        </PopoverTrigger>
        <PopoverContent width="md" aria-label="Options">
          <div className="flex flex-col">
            <Checkbox
              tone="neutral"
              checked={Boolean(toggles.sub)}
              onCheckedChange={(next) => setToggles((t) => ({ ...t, sub: Boolean(next) }))}
              label={<span className="flex-1">Show sub-work items</span>}
            />
            <Checkbox
              tone="neutral"
              checked={Boolean(toggles.empty)}
              onCheckedChange={(next) => setToggles((t) => ({ ...t, empty: Boolean(next) }))}
              label={<span className="flex-1">Show empty groups</span>}
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  },
  play: async ({ canvas, step }) => {
    await step("open the popover and toggle a checkbox", async () => {
      const trigger = canvas.getByRole("button", { name: "Options" });
      await userEvent.click(trigger);
      const panel = await waitFor(() => {
        const el = document.body.querySelector('[aria-label="Options"]');
        if (!el) throw new Error("panel not open");
        return el as HTMLElement;
      });
      // The panel is a generic surface, NOT an ARIA menu.
      await expect(panel).not.toHaveAttribute("role", "menu");
      const empty = within(panel).getByRole("checkbox", { name: "Show empty groups" });
      await expect(empty).not.toBeChecked();
      await userEvent.click(empty);
      await waitFor(() => expect(empty).toBeChecked());
      // Toggling content keeps the panel open.
      await expect(document.body.querySelector('[aria-label="Options"]')).toBeInTheDocument();
    });
    await step("Escape closes the popover and returns focus to the trigger", async () => {
      await userEvent.keyboard("{Escape}");
      await waitFor(() =>
        expect(document.body.querySelector('[aria-label="Options"]')).not.toBeInTheDocument(),
      );
      await expect(canvas.getByRole("button", { name: "Options" })).toHaveFocus();
    });
  },
};

/**
 * **DisplayProperties** — the settings panel that used to live in the Dropdown stories
 * (and had to disable `aria-allowed-attr`). On the non-menu Popover surface the pill
 * group, single-select `Radio` section, and checkbox-toggle footer are all valid
 * children, so axe passes with no suppressions.
 *
 * NOTE: the selectable pill/chip group is a minimal local primitive — propel has no
 * "chip" component yet (flagged in the PR).
 */
export const DisplayProperties: Story = {
  render: function DisplayPropertiesStory() {
    const PILLS = ["ID", "Work item type", "Assignee", "Start date", "Due date", "Labels"];
    const [pills, setPills] = React.useState<Record<string, boolean>>({
      ID: true,
      "Work item type": true,
      Assignee: true,
      "Due date": true,
    });
    const [groupBy, setGroupBy] = React.useState("state");
    const [toggles, setToggles] = React.useState<Record<string, boolean>>({});
    return (
      <Popover>
        <PopoverTrigger render={<button type="button" className={triggerClass} />}>
          Display
        </PopoverTrigger>
        <PopoverContent width="md" aria-label="Display options">
          <PanelLabel>Display Properties</PanelLabel>
          <div className="flex flex-wrap gap-1.5 px-2 py-1.5">
            {PILLS.map((p) => (
              <DisplayPill
                key={p}
                label={p}
                selected={Boolean(pills[p])}
                onClick={() => setPills((s) => ({ ...s, [p]: !s[p] }))}
              />
            ))}
          </div>
          <PanelSeparator />
          <PanelLabel>Group by</PanelLabel>
          {/* Collapse RadioGroup's default row gap so the rows sit flush like the
              dropdown's menu items. */}
          <div className="[&>[role=radiogroup]]:gap-0">
            <RadioGroup value={groupBy} onValueChange={(v) => setGroupBy(String(v))}>
              {["Priority", "State", "Cycle", "Labels"].map((g) => (
                <PanelRadioRow key={g} value={g.toLowerCase()} label={g} />
              ))}
            </RadioGroup>
          </div>
          <PanelSeparator />
          <div className="flex flex-col">
            <Checkbox
              tone="neutral"
              checked={Boolean(toggles.sub)}
              onCheckedChange={(next) => setToggles((t) => ({ ...t, sub: Boolean(next) }))}
              label={<span className="flex-1">Show sub-work items</span>}
            />
            <Checkbox
              tone="neutral"
              checked={Boolean(toggles.empty)}
              onCheckedChange={(next) => setToggles((t) => ({ ...t, empty: Boolean(next) }))}
              label={<span className="flex-1">Show empty groups</span>}
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  },
  play: async ({ canvas, step }) => {
    await step("open and toggle a property pill", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Display" }));
      const panel = await waitFor(() => {
        const el = document.body.querySelector('[aria-label="Display options"]');
        if (!el) throw new Error("panel not open");
        return el as HTMLElement;
      });
      const labelsPill = within(panel).getByRole("button", { name: "Labels", pressed: false });
      await userEvent.click(labelsPill);
      await waitFor(() => expect(labelsPill).toHaveAttribute("aria-pressed", "true"));
    });
    await step("pick a different Group by radio", async () => {
      const panel = document.body.querySelector('[aria-label="Display options"]') as HTMLElement;
      const cycle = within(panel).getByRole("radio", { name: "Cycle" });
      await userEvent.click(cycle);
      await waitFor(() => expect(cycle).toBeChecked());
    });
  },
};

/**
 * **DisplayAccordion** — the other settings panel that used to disable `aria-allowed-attr`
 * in the Dropdown stories. Collapsible sections with an expanded single-select `Radio`
 * sort list and checkbox toggles, all valid on the non-menu Popover surface.
 */
export const DisplayAccordion: Story = {
  render: function DisplayAccordionStory() {
    const [open, setOpen] = React.useState<string | null>("order");
    const [order, setOrder] = React.useState("priority");
    const [toggles, setToggles] = React.useState<Record<string, boolean>>({});
    const SECTIONS = ["Display Properties", "Group by", "Sub Group by", "Order by"];
    const ORDER = ["Manual - Rank", "Last created", "Last updated", "Priority", "Due date"];
    return (
      <Popover>
        <PopoverTrigger render={<button type="button" className={triggerClass} />}>
          Display options
        </PopoverTrigger>
        <PopoverContent width="md" aria-label="Display options">
          {SECTIONS.map((title) => {
            const key = title.split(" ")[0].toLowerCase();
            const isOpen = open === key;
            return (
              <div key={title}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : key)}
                  className="flex h-[34px] w-full items-center gap-2 rounded-md px-2 text-13 text-secondary outline-none hover:bg-layer-transparent-hover"
                >
                  <span className="min-w-0 flex-1 truncate text-left">{title}</span>
                  {isOpen ? (
                    <ChevronUp className="size-4 shrink-0 text-icon-tertiary" />
                  ) : (
                    <ChevronDown className="size-4 shrink-0 text-icon-tertiary" />
                  )}
                </button>
                {isOpen && key === "order" ? (
                  // Items within an expanded category sit flush (0 spacing): collapse
                  // RadioGroup's default row gap from the parent.
                  <div className="[&>[role=radiogroup]]:gap-0">
                    <RadioGroup value={order} onValueChange={(v) => setOrder(String(v))}>
                      {ORDER.map((o) => (
                        <PanelRadioRow key={o} value={o.toLowerCase()} label={o} />
                      ))}
                    </RadioGroup>
                  </div>
                ) : null}
              </div>
            );
          })}
          <PanelSeparator />
          <div className="flex flex-col">
            <Checkbox
              tone="neutral"
              checked={Boolean(toggles.sub)}
              onCheckedChange={(next) => setToggles((t) => ({ ...t, sub: Boolean(next) }))}
              label={<span className="flex-1">Show sub-work items</span>}
            />
            <Checkbox
              tone="neutral"
              checked={Boolean(toggles.empty)}
              onCheckedChange={(next) => setToggles((t) => ({ ...t, empty: Boolean(next) }))}
              label={<span className="flex-1">Show empty groups</span>}
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  },
  play: async ({ canvas, step }) => {
    const findHeader = (panel: HTMLElement, text: string) =>
      within(panel)
        .getAllByRole("button")
        .find((b) => b.textContent?.includes(text)) as HTMLElement;

    await step("open the panel with Order by expanded", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Display options" }));
      const panel = await waitFor(() => {
        const el = document.body.querySelector('[aria-label="Display options"]');
        if (!el) throw new Error("panel not open");
        return el as HTMLElement;
      });
      await waitFor(() => expect(panel.textContent?.includes("Last created")).toBe(true));
    });

    await step("collapse and re-expand the Order by section", async () => {
      const panel = document.body.querySelector('[aria-label="Display options"]') as HTMLElement;
      await userEvent.click(findHeader(panel, "Order by"));
      await waitFor(() => expect(panel.textContent?.includes("Last created")).toBe(false));
      await userEvent.click(findHeader(panel, "Order by"));
      await waitFor(() => expect(panel.textContent?.includes("Last created")).toBe(true));
    });
  },
};

/**
 * The popover is RTL-safe: the positioner resolves logical sides, so opening toward
 * `inline-start` / `inline-end` flips with writing direction. Wrapped in Base UI's
 * `DirectionProvider` (and `dir="rtl"` on the root, since the panel portals to `<body>`)
 * to mirror a real RTL app.
 */
export const RTL: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  // The panel portals to <body>, so `dir="rtl"` must live on a portal ancestor (`<html>`)
  // for the logical sides to resolve. Mirror a real RTL app: set it on the root, restore
  // on unmount. `DirectionProvider` crosses the portal via React context.
  decorators: [
    (Story) => {
      useLayoutEffect(() => {
        const html = document.documentElement;
        const prev = html.getAttribute("dir");
        html.setAttribute("dir", "rtl");
        return () => {
          if (prev) html.setAttribute("dir", prev);
          else html.removeAttribute("dir");
        };
      }, []);
      return <Story />;
    },
  ],
  render: function RtlStory() {
    return (
      <DirectionProvider direction="rtl">
        <Popover>
          <PopoverTrigger render={<button type="button" className={triggerClass} />}>
            خيارات
          </PopoverTrigger>
          <PopoverContent width="md" aria-label="Options">
            <PanelLabel>الترتيب حسب</PanelLabel>
            <RadioGroup defaultValue="priority">
              <PanelRadioRow value="priority" label="الأولوية" />
              <PanelRadioRow value="created" label="تاريخ الإنشاء" />
              <PanelRadioRow value="updated" label="آخر تحديث" />
            </RadioGroup>
          </PopoverContent>
        </Popover>
      </DirectionProvider>
    );
  },
  play: async ({ canvas, step }) => {
    await step("open the RTL popover and pick a radio", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "خيارات" }));
      const panel = await waitFor(() => {
        const el = document.body.querySelector('[aria-label="Options"]');
        if (!el) throw new Error("panel not open");
        return el as HTMLElement;
      });
      const updated = within(panel).getByRole("radio", { name: "آخر تحديث" });
      await userEvent.click(updated);
      await waitFor(() => expect(updated).toBeChecked());
    });
    await step("Escape closes and restores focus", async () => {
      await userEvent.keyboard("{Escape}");
      await waitFor(() =>
        expect(document.body.querySelector('[aria-label="Options"]')).not.toBeInTheDocument(),
      );
      await expect(canvas.getByRole("button", { name: "خيارات" })).toHaveFocus();
    });
  },
};
