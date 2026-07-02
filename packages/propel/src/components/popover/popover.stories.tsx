import { DirectionProvider } from "@base-ui/react/direction-provider";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { useLayoutEffect } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../../elements/button";
import { Checkbox } from "../checkbox/index";
import { PillSwitch } from "../pill/index";
import { Radio, RadioGroup } from "../radio/index";
import { Popover, PopoverContent, PopoverTrigger } from "./index";

const meta = {
  title: "Components/Popover",
  component: Popover,
  // Popover is a compound component; document the trigger + content parts alongside
  // the root so their props appear in the args table and the relationship is recorded.
  subcomponents: { PopoverTrigger, PopoverContent },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Demo-only fixtures. The section heading + divider + radio row below are minimal
// local stand-ins (propel has no settings-panel-row primitive); the selectable
// property pills use the real propel `PillSwitch`.
// ---------------------------------------------------------------------------

// A section heading inside a settings panel.
function PanelLabel({ children }: { children: React.ReactNode }) {
  return <div className="px-2 py-1.5 text-12 text-tertiary">{children}</div>;
}

// A thin divider between panel sections (matches the menu's separator).
function PanelSeparator() {
  return <div className="-mx-1 my-1 border-t border-subtle" />;
}

// A row whose leading control is a propel Radio, for single-select sort lists.
// Sized to match a MenuItem (34px tall, `rounded-md`) so the panel reads like
// the menu.
function PanelRadioRow({ value, label }: { value: string; label: string }) {
  return (
    <label className="flex h-[34px] cursor-pointer items-center gap-2 rounded-md px-2 text-13 text-secondary hover:bg-layer-transparent-hover">
      <Radio value={value} />
      <span className="min-w-0 flex-1 truncate">{label}</span>
    </label>
  );
}

// The checkbox-toggle footer (show sub-work items / show empty groups) that closes
// several of the display panels. Each panel gets an independent copy that owns its
// own state; pass `defaultToggles` to start a key checked.
function ToggleFooter({ defaultToggles = {} }: { defaultToggles?: Record<string, boolean> }) {
  const [toggles, setToggles] = React.useState<Record<string, boolean>>(defaultToggles);
  return (
    <div className="flex flex-col">
      <Checkbox
        checked={Boolean(toggles.sub)}
        onCheckedChange={(next) => setToggles((t) => ({ ...t, sub: Boolean(next) }))}
        label={<span className="flex-1">Show sub-work items</span>}
      />
      <Checkbox
        checked={Boolean(toggles.empty)}
        onCheckedChange={(next) => setToggles((t) => ({ ...t, empty: Boolean(next) }))}
        label={<span className="flex-1">Show empty groups</span>}
      />
    </div>
  );
}

/**
 * The default popover: a trigger plus a generic floating panel. The panel hosts arbitrary content
 * (here a couple of checkbox toggles) — it is NOT a `role="menu"`, so these controls are valid
 * children. Open it by clicking the trigger; dismiss with `Esc`, an outside click, or by toggling
 * the trigger again.
 */
export const Default: Story = {
  render: () => (
    <Popover>
      <Button
        sizing="hug"
        prominence="secondary"
        tone="neutral"
        magnitude="xl"
        render={<PopoverTrigger />}
      >
        Options
      </Button>
      <PopoverContent side="bottom" align="start" width="md" aria-label="Options">
        <ToggleFooter defaultToggles={{ sub: true }} />
      </PopoverContent>
    </Popover>
  ),
};

export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
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
 * **DisplayProperties** — the settings panel that used to live in the Menu stories (and had to
 * disable `aria-allowed-attr`). On the non-menu Popover surface the pill group, single-select
 * `Radio` section, and checkbox-toggle footer are all valid children, so axe passes with no
 * suppressions.
 *
 * The selectable property pills are propel's `PillSwitch` (a toggle pill).
 */
export const DisplayProperties: Story = {
  render: function Render() {
    const PILLS = ["ID", "Work item type", "Assignee", "Start date", "Due date", "Labels"];
    const [pills, setPills] = React.useState<Record<string, boolean>>({
      ID: true,
      "Work item type": true,
      Assignee: true,
      "Due date": true,
    });
    const [groupBy, setGroupBy] = React.useState("state");
    return (
      <Popover>
        <Button
          sizing="hug"
          prominence="secondary"
          tone="neutral"
          magnitude="xl"
          render={<PopoverTrigger />}
        >
          Display
        </Button>
        <PopoverContent side="bottom" align="start" width="md" aria-label="Display options">
          <PanelLabel>Display Properties</PanelLabel>
          <div className="flex flex-wrap gap-1.5 px-2 py-1.5">
            {PILLS.map((p) => (
              <PillSwitch
                key={p}
                magnitude="md"
                pressed={Boolean(pills[p])}
                onPressedChange={(next) => setPills((s) => ({ ...s, [p]: next }))}
              >
                {p}
              </PillSwitch>
            ))}
          </div>
          <PanelSeparator />
          <PanelLabel>Group by</PanelLabel>
          {/* Rows sit flush like the menu's items. */}
          <RadioGroup
            density="compact"
            value={groupBy}
            onValueChange={(v) => setGroupBy(String(v))}
          >
            {["Priority", "State", "Cycle", "Labels"].map((g) => (
              <PanelRadioRow key={g} value={g.toLowerCase()} label={g} />
            ))}
          </RadioGroup>
          <PanelSeparator />
          <ToggleFooter />
        </PopoverContent>
      </Popover>
    );
  },
};

export const DisplayPropertiesInteraction: Story = {
  ...DisplayProperties,
  tags: ["!dev", "!autodocs", "!manifest"],
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
 * **DisplayAccordion** — the other settings panel that used to disable `aria-allowed-attr` in the
 * Menu stories. Collapsible sections with an expanded single-select `Radio` sort list and checkbox
 * toggles, all valid on the non-menu Popover surface.
 */
export const DisplayAccordion: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState<string | null>("order");
    const [order, setOrder] = React.useState("priority");
    const SECTIONS = ["Display Properties", "Group by", "Sub Group by", "Order by"];
    const ORDER = ["Manual - Rank", "Last created", "Last updated", "Priority", "Due date"];
    return (
      <Popover>
        <Button
          sizing="hug"
          prominence="secondary"
          tone="neutral"
          magnitude="xl"
          render={<PopoverTrigger />}
        >
          Display options
        </Button>
        <PopoverContent side="bottom" align="start" width="md" aria-label="Display options">
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
                  // Items within an expanded category sit flush (0 spacing).
                  <RadioGroup
                    density="compact"
                    value={order}
                    onValueChange={(v) => setOrder(String(v))}
                  >
                    {ORDER.map((o) => (
                      <PanelRadioRow key={o} value={o.toLowerCase()} label={o} />
                    ))}
                  </RadioGroup>
                ) : null}
              </div>
            );
          })}
          <PanelSeparator />
          <ToggleFooter />
        </PopoverContent>
      </Popover>
    );
  },
};

export const DisplayAccordionInteraction: Story = {
  ...DisplayAccordion,
  tags: ["!dev", "!autodocs", "!manifest"],
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
 * The popover is RTL-safe: the positioner resolves logical sides, so opening toward `inline-start`
 * / `inline-end` flips with writing direction. Wrapped in Base UI's `DirectionProvider` (and
 * `dir="rtl"` on the root, since the panel portals to `<body>`) to mirror a real RTL app.
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
  render: function Render() {
    return (
      <DirectionProvider direction="rtl">
        <Popover>
          <Button
            sizing="hug"
            prominence="secondary"
            tone="neutral"
            magnitude="xl"
            render={<PopoverTrigger />}
          >
            خيارات
          </Button>
          <PopoverContent side="bottom" align="start" width="md" aria-label="Options">
            <PanelLabel>الترتيب حسب</PanelLabel>
            <RadioGroup density="comfortable" defaultValue="priority">
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
