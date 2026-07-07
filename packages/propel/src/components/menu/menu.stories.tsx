import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ChevronDown,
  ChevronRight,
  Circle,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleX,
  Copy,
  ExternalLink,
  Globe,
  Link2,
  Lock,
  Pencil,
  Plus,
  SignalHigh,
  SignalLow,
  SignalMedium,
  Trash2,
} from "lucide-react";
import * as React from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Avatar } from "../avatar/index";
import { Badge } from "../badge/index";
import { Icon } from "../icon";
import {
  createMenuHandle,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuFooter,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuSearch,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuContent,
  MenuSubmenuTrigger,
  MenuTrigger,
  MenuViewport,
  MenuRadioGroup,
  MenuRadioItem,
} from "./index";

const meta = {
  title: "Components/Menu",
  component: Menu,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=30-1078",
    },
  },
  // Menu is a compound component; document every menu part alongside the root so
  // their props appear in the args table and the relationship is recorded in the
  // manifest (the same pattern AvatarGroup uses for Avatar).
  subcomponents: {
    MenuTrigger,
    MenuContent,
    MenuItem,
    MenuCheckboxItem,
    MenuSeparator,
    MenuGroup,
    MenuLabel,
    MenuSearch,
    MenuFooter,
    MenuSubmenu,
    MenuSubmenuTrigger,
    MenuSubmenuContent,
    MenuViewport,
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

// A plain trigger button styled with propel tokens — the menu itself doesn't
// ship a trigger style, so stories provide one to keep the focus on the menu.
const triggerClass =
  "inline-flex h-8 items-center gap-1.5 rounded-md border border-subtle bg-surface-1 px-3 text-13 text-secondary outline-none";

// Open the menu and wait for its portal popup to mount. Shared by the play tests.
async function openMenu(canvas: ReturnType<typeof within>, name: string) {
  await userEvent.click(canvas.getByRole("button", { name }));
  await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
}

function findItem(role: string, text: string) {
  return Array.from(document.body.querySelectorAll(`[role="${role}"]`)).find((el) =>
    el.textContent?.includes(text),
  ) as HTMLElement | undefined;
}

// True when a CSS color string is fully transparent (the bug: a tone-less checked
// box rendered with no fill, i.e. `transparent` / `rgba(...,0)`).
function isTransparent(color: string) {
  if (color === "transparent" || color === "rgba(0, 0, 0, 0)") return true;
  const match = /rgba?\([^)]*?,\s*([\d.]+)\s*\)/.exec(color);
  return match != null && Number(match[1]) === 0;
}

// Resolve the `bg-accent-primary` token to a concrete, browser-normalized rgb
// string by probing a throwaway element. Lets the assertion compare against the
// real accent color without hardcoding a hex/rgb that could drift from the token.
function resolveAccentPrimary() {
  const probe = document.createElement("span");
  probe.className = "bg-accent-primary";
  probe.style.position = "fixed";
  probe.style.opacity = "0";
  probe.style.pointerEvents = "none";
  document.body.appendChild(probe);
  const color = getComputedStyle(probe).backgroundColor;
  probe.remove();
  return color;
}

// The checkbox box inside a `menuitemcheckbox` row is the kept-mounted
// `Menu.CheckboxItemIndicator` — an `aria-hidden` span carrying `data-checked` /
// `data-unchecked`. Returns its computed background-color.
function checkboxBoxBgColor(row: HTMLElement) {
  const box = row.querySelector("[data-checked], [data-unchecked]") as HTMLElement | null;
  if (box == null) throw new Error("checkbox indicator box not found in row");
  return getComputedStyle(box).backgroundColor;
}

// ---------------------------------------------------------------------------
// Small demo-only fixtures. Where a demo needs a propel primitive that does not
// exist yet (a selectable pill/chip, a sort-direction button group), a minimal
// local version is defined inline and flagged in the PR — it is NOT part of the
// Menu API.
// ---------------------------------------------------------------------------

// Status glyphs (Figma "Status" demo).
const STATUSES = [
  { key: "backlog", label: "Backlog", icon: <CircleDashed className="size-4 text-tertiary" /> },
  { key: "todo", label: "Todo", icon: <Circle className="size-4 text-tertiary" /> },
  {
    key: "in_progress",
    label: "In Progress",
    icon: <CircleDot className="size-4 text-warning-primary" />,
  },
  { key: "done", label: "Done", icon: <CircleCheck className="size-4 text-success-primary" /> },
  { key: "cancelled", label: "Cancelled", icon: <CircleX className="size-4 text-tertiary" /> },
] as const;

// Priority glyphs (Figma "Priority" demo).
const PRIORITIES = [
  { key: "urgent", label: "Urgent", icon: <span className="text-12">⛔</span> },
  { key: "high", label: "High", icon: <SignalHigh className="size-4 text-label-orange-icon" /> },
  {
    key: "medium",
    label: "Medium",
    icon: <SignalMedium className="size-4 text-label-yellow-icon" />,
  },
  { key: "low", label: "Low", icon: <SignalLow className="size-4 text-label-indigo-icon" /> },
  { key: "none", label: "None", icon: <span className="text-tertiary">—</span> },
] as const;

const LABELS = [
  { key: "customer", label: "Customer request", color: "bg-label-orange-bg-strong" },
  { key: "feedback", label: "Feedback", color: "bg-label-emerald-bg-strong" },
  { key: "design", label: "Design", color: "bg-label-purple-bg-strong" },
  { key: "dev", label: "Dev", color: "bg-label-indigo-bg-strong" },
  { key: "feature", label: "Feature", color: "bg-label-crimson-bg-strong" },
] as const;

const ASSIGNEES: ReadonlyArray<{ key: string; name: string; disabled?: boolean }> = [
  { key: "amelia", name: "Amelia Parker" },
  { key: "david", name: "David Wilson" },
  { key: "samuel", name: "Samuel Wright", disabled: true },
  { key: "sarah", name: "Sarah Jones" },
  { key: "ethan", name: "Ethan Parker" },
];

const LANGUAGES = [
  { key: "en", label: "English", secondary: "English" },
  { key: "es", label: "Español", secondary: "Spanish" },
  { key: "fr", label: "Français", secondary: "French" },
  { key: "de", label: "Deutsch", secondary: "German" },
  { key: "it", label: "Italiano", secondary: "Italian" },
  { key: "pt", label: "Português", secondary: "Portuguese" },
  { key: "nl", label: "Nederlands", secondary: "Dutch" },
] as const;

// A small color swatch, used as the leading control alongside the Checkbox for
// labels. Not a propel primitive — local to the demo.
function ColorSwatch({ className }: { className: string }) {
  return <span className={`size-3.5 shrink-0 rounded-xs ${className}`} aria-hidden />;
}

// Initials for an Avatar fallback ("Amelia Parker" -> "AP").
function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

/**
 * Demo 1 — **Status**. Single-select with status icons, a sticky search header, and a leading
 * checkmark on the selected row only.
 */
export const Status: Story = {
  render: function Render() {
    const [selected, setSelected] = React.useState<string>("backlog");
    const [query, setQuery] = React.useState("");
    const visible = STATUSES.filter((s) => s.label.toLowerCase().includes(query.toLowerCase()));
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>
          {STATUSES.find((s) => s.key === selected)?.label ?? "Status"}
        </MenuTrigger>
        <MenuContent
          sizing="sm"
          search={<MenuSearch value={query} onValueChange={setQuery} placeholder="Search" />}
        >
          {visible.map((s) => (
            <MenuItem
              key={s.key}
              icon={s.icon}
              selected={selected === s.key}
              closeOnClick={false}
              onClick={() => setSelected(s.key)}
              label={s.label}
            />
          ))}
        </MenuContent>
      </Menu>
    );
  },
};

export const StatusInteraction: Story = {
  ...Status,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("open and pick a status", async () => {
      await openMenu(canvas, "Backlog");
      const done = await waitFor(() => findItem("menuitem", "Done") as HTMLElement);
      await userEvent.click(done);
      await waitFor(() =>
        expect(canvas.getByRole("button").textContent?.includes("Done")).toBe(true),
      );
    });
  },
};

/**
 * Demo 2 — **Labels**. Multi-select: each row is a `MenuCheckboxItem` (the propel `Checkbox` as the
 * leading control) plus a color swatch, with a search header. When the typed query has no exact
 * match, an "Add label" option (Figma `64-626`) appears, separated from the search by a single
 * divider line.
 */
export const Labels: Story = {
  render: function Render() {
    const [checked, setChecked] = React.useState<Record<string, boolean>>({ customer: true });
    const [query, setQuery] = React.useState("");
    const trimmed = query.trim();
    const visible = LABELS.filter((l) => l.label.toLowerCase().includes(query.toLowerCase()));
    // Offer "Add label" whenever the query doesn't exactly match an existing label.
    const canAdd =
      trimmed.length > 0 && !LABELS.some((l) => l.label.toLowerCase() === trimmed.toLowerCase());
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>Labels</MenuTrigger>
        <MenuContent
          sizing="sm"
          search={<MenuSearch value={query} onValueChange={setQuery} placeholder="Search" />}
        >
          {canAdd ? (
            // A single horizontal divider separates the search from the new-label item
            // (Figma 64-626): the sticky MenuSearch already draws its own bottom
            // rule, so the "Add label" row mounts directly beneath it with no extra line.
            <MenuItem
              icon={<Icon icon={Plus} tint="secondary" />}
              closeOnClick={false}
              label={`Add label "${trimmed}"`}
            />
          ) : null}
          {visible.map((l) => (
            <MenuCheckboxItem
              key={l.key}
              icon={<ColorSwatch className={l.color} />}
              checked={Boolean(checked[l.key])}
              onCheckedChange={(next) => setChecked((c) => ({ ...c, [l.key]: next }))}
              label={l.label}
            />
          ))}
        </MenuContent>
      </Menu>
    );
  },
};

export const LabelsInteraction: Story = {
  ...Labels,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("open and toggle a label", async () => {
      await openMenu(canvas, "Labels");
      const feedback = (await waitFor(() =>
        findItem("menuitemcheckbox", "Feedback"),
      )) as HTMLElement;
      await expect(feedback).toHaveAttribute("aria-checked", "false");
      await userEvent.click(feedback);
      await waitFor(() => expect(feedback).toHaveAttribute("aria-checked", "true"));
      // Multi-select stays open.
      await expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument();
    });
    await step("typing a new name reveals the Add label option", async () => {
      const search = document.body.querySelector('input[type="text"]') as HTMLInputElement;
      await userEvent.type(search, "Product");
      await waitFor(() => expect(findItem("menuitem", 'Add label "Product"')).toBeDefined());
    });
  },
};

/**
 * Demo 3 — **ActionMenu**. Icon items, `endContent` keyboard shortcuts, a disabled item with a
 * description, a destructive Delete, and separators between groups.
 */
export const ActionMenu: Story = {
  render: () => (
    <Menu>
      <MenuTrigger render={<button type="button" className={triggerClass} />}>Actions</MenuTrigger>
      <MenuContent sizing="sm">
        <MenuItem icon={<Icon icon={Pencil} tint="secondary" />} label="Edit" />
        <MenuItem icon={<Icon icon={Copy} tint="secondary" />} label="Make a copy" />
        <MenuItem icon={<Icon icon={ExternalLink} tint="secondary" />} label="Open in new tab" />
        <MenuItem
          icon={<Icon icon={Link2} tint="secondary" />}
          endContent={<span className="text-12 text-tertiary">⌘L</span>}
          label="Copy link"
        />
        <MenuSeparator />
        <MenuItem
          icon={<Icon icon={Trash2} tint="secondary" />}
          description="Only completed or cancelled work items can be archived"
          disabled
          label="Archive"
        />
        <MenuSeparator />
        <MenuItem tone="danger" icon={<Icon icon={Trash2} />} label="Delete" />
      </MenuContent>
    </Menu>
  ),
};

export const ActionMenuInteraction: Story = {
  ...ActionMenu,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("open and confirm the disabled Archive row", async () => {
      await openMenu(canvas, "Actions");
      const archive = (await waitFor(() => findItem("menuitem", "Archive"))) as HTMLElement;
      await expect(archive).toHaveAttribute("data-disabled");
    });

    // Keyboard ARIA pattern (WAI-ARIA menu button): on the trigger, Enter/Space/
    // ArrowDown open the menu and focus the first item; Arrow Down/Up navigate;
    // Enter activates + closes + returns focus to the trigger; Escape closes +
    // returns focus. The menu portals to <body>, so query items by unique text.
    await step("Escape closes and returns focus to the trigger", async () => {
      const trigger = canvas.getByRole("button", { name: "Actions" });
      await userEvent.keyboard("{Escape}");
      await waitFor(() =>
        expect(document.body.querySelector('[role="menu"]')).not.toBeInTheDocument(),
      );
      await expect(trigger).toHaveFocus();
    });

    await step("ArrowDown opens the menu and highlights the first item", async () => {
      const trigger = canvas.getByRole("button", { name: "Actions" });
      trigger.focus();
      await userEvent.keyboard("{ArrowDown}");
      await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
      const edit = (await waitFor(() => findItem("menuitem", "Edit"))) as HTMLElement;
      await waitFor(() => expect(edit).toHaveFocus());
    });

    await step("ArrowDown/ArrowUp move highlight between items", async () => {
      await userEvent.keyboard("{ArrowDown}");
      await waitFor(() => expect(findItem("menuitem", "Make a copy")).toHaveFocus());
      await userEvent.keyboard("{ArrowUp}");
      await waitFor(() => expect(findItem("menuitem", "Edit")).toHaveFocus());
    });

    await step("Enter activates the item, closes the menu, and restores focus", async () => {
      const trigger = canvas.getByRole("button", { name: "Actions" });
      await userEvent.keyboard("{Enter}");
      await waitFor(() =>
        expect(document.body.querySelector('[role="menu"]')).not.toBeInTheDocument(),
      );
      await waitFor(() => expect(trigger).toHaveFocus());
    });
  },
};

/**
 * Demo 4 — **Description**. Single-select with a two-line label + muted description, laid out in a
 * wider menu.
 */
export const Description: Story = {
  render: function Render() {
    const [selected, setSelected] = React.useState("private");
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>
          Visibility
        </MenuTrigger>
        <MenuContent sizing="lg">
          <MenuItem
            icon={<Icon icon={Lock} tint="secondary" />}
            description="Accessible only by invite"
            selected={selected === "private"}
            closeOnClick={false}
            onClick={() => setSelected("private")}
            label="Private"
          />
          <MenuItem
            icon={<Icon icon={Globe} tint="secondary" />}
            description="Anyone in the workspace except Guests can join"
            selected={selected === "public"}
            closeOnClick={false}
            onClick={() => setSelected("public")}
            label="Public"
          />
        </MenuContent>
      </Menu>
    );
  },
};

export const DescriptionInteraction: Story = {
  ...Description,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("open and select Public", async () => {
      await openMenu(canvas, "Visibility");
      const pub = (await waitFor(() => findItem("menuitem", "Public"))) as HTMLElement;
      await userEvent.click(pub);
      await waitFor(() =>
        expect(findItem("menuitem", "Public")?.querySelector("svg")).toBeInTheDocument(),
      );
    });
  },
};

/**
 * `MenuLabel` titles a grouped section and can carry inline-end metadata; `MenuFooter` renders
 * sticky non-menu chrome outside the `role="menu"` list.
 */
export const LabelAndFooterSemantics: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Menu>
      <MenuTrigger render={<button type="button" className={triggerClass} />}>
        Grouped menu
      </MenuTrigger>
      <MenuContent sizing="sm" footer={<MenuFooter>Type to add another item.</MenuFooter>}>
        <MenuGroup>
          <MenuLabel meta={<span>3</span>}>Section</MenuLabel>
          <MenuItem label="First item" />
        </MenuGroup>
      </MenuContent>
    </Menu>
  ),
  play: async ({ canvas }) => {
    await openMenu(canvas, "Grouped menu");
    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    await expect(document.body).toHaveTextContent("Section");
    await expect(document.body).toHaveTextContent("3");
    await expect(document.body).toHaveTextContent("Type to add another item.");
  },
};

/**
 * Demo 5 — **Assignees**. Multi-select: a `MenuCheckboxItem` (propel `Checkbox`) with a propel
 * `Avatar` as the leading content, a search header, and a disabled row.
 */
export const Assignees: Story = {
  render: function Render() {
    const [checked, setChecked] = React.useState<Record<string, boolean>>({ amelia: true });
    const [query, setQuery] = React.useState("");
    const visible = ASSIGNEES.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()));
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>
          Assignees
        </MenuTrigger>
        <MenuContent
          sizing="sm"
          search={<MenuSearch value={query} onValueChange={setQuery} placeholder="Search" />}
        >
          {visible.map((a) => (
            <MenuCheckboxItem
              key={a.key}
              icon={<Avatar magnitude="2xs" fallback={initials(a.name)} alt={a.name} />}
              checked={Boolean(checked[a.key])}
              disabled={a.disabled}
              onCheckedChange={(next) => setChecked((c) => ({ ...c, [a.key]: next }))}
              label={a.name}
            />
          ))}
        </MenuContent>
      </Menu>
    );
  },
};

export const AssigneesInteraction: Story = {
  ...Assignees,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("open and toggle an assignee", async () => {
      await openMenu(canvas, "Assignees");
      const david = (await waitFor(() =>
        findItem("menuitemcheckbox", "David Wilson"),
      )) as HTMLElement;
      await userEvent.click(david);
      await waitFor(() => expect(david).toHaveAttribute("aria-checked", "true"));
    });
    await step("the disabled row cannot be toggled", async () => {
      const samuel = findItem("menuitemcheckbox", "Samuel Wright") as HTMLElement;
      await expect(samuel).toHaveAttribute("data-disabled");
    });
  },
};

/**
 * Demo 6 — **LanguagePicker**. Single-select; each row pairs a label with muted secondary text
 * inline (the English name), a search header, and a selected checkmark.
 */
export const LanguagePicker: Story = {
  render: function Render() {
    const [selected, setSelected] = React.useState("en");
    const [query, setQuery] = React.useState("");
    const visible = LANGUAGES.filter((l) =>
      `${l.label} ${l.secondary}`.toLowerCase().includes(query.toLowerCase()),
    );
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>
          {LANGUAGES.find((l) => l.key === selected)?.label ?? "Language"}
        </MenuTrigger>
        <MenuContent
          sizing="sm"
          search={<MenuSearch value={query} onValueChange={setQuery} placeholder="Search" />}
        >
          {visible.map((l) => (
            <MenuItem
              key={l.key}
              secondaryText={l.secondary}
              selected={selected === l.key}
              closeOnClick={false}
              onClick={() => setSelected(l.key)}
              label={l.label}
            />
          ))}
        </MenuContent>
      </Menu>
    );
  },
};

export const LanguagePickerInteraction: Story = {
  ...LanguagePicker,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("filter and select a language", async () => {
      await openMenu(canvas, "English");
      const search = (await waitFor(() =>
        document.body.querySelector('input[type="text"]'),
      )) as HTMLInputElement;
      await userEvent.type(search, "Span");
      await waitFor(() => expect(findItem("menuitem", "Español")).toBeDefined());
      await userEvent.click(findItem("menuitem", "Español") as HTMLElement);
      await waitFor(() =>
        expect(canvas.getByRole("button").textContent?.includes("Español")).toBe(true),
      );
    });
  },
};

/**
 * Demo 7 — **Priority**. Multi-select: a `MenuCheckboxItem` (propel `Checkbox`) with a leading
 * priority glyph, plus a search header.
 */
export const Priority: Story = {
  render: function Render() {
    const [checked, setChecked] = React.useState<Record<string, boolean>>({});
    const [query, setQuery] = React.useState("");
    const visible = PRIORITIES.filter((p) => p.label.toLowerCase().includes(query.toLowerCase()));
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>
          Priority
        </MenuTrigger>
        <MenuContent
          sizing="sm"
          search={<MenuSearch value={query} onValueChange={setQuery} placeholder="Search" />}
        >
          {visible.map((p) => (
            <MenuCheckboxItem
              key={p.key}
              icon={p.icon}
              checked={Boolean(checked[p.key])}
              onCheckedChange={(next) => setChecked((c) => ({ ...c, [p.key]: next }))}
              label={p.label}
            />
          ))}
        </MenuContent>
      </Menu>
    );
  },
};

export const PriorityInteraction: Story = {
  ...Priority,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("open and toggle High", async () => {
      await openMenu(canvas, "Priority");
      const high = (await waitFor(() => findItem("menuitemcheckbox", "High"))) as HTMLElement;
      await userEvent.click(high);
      await waitFor(() => expect(high).toHaveAttribute("aria-checked", "true"));
    });
  },
};

// How many rows a `viewAll` section shows before the "View all" toggle. The rest stay
// collapsed inline until the toggle is activated.
const VIEW_ALL_PREVIEW = 2;

/**
 * Regression — **CheckedFillVisible**. Locks in the fix for the invisible checked checkbox: a
 * tone-less checkbox box (the `MenuCheckboxItemIndicator`, as rendered by `MenuCheckboxItem`) used
 * to inherit no fill, so the white check sat on a transparent box and disappeared. Toggling a row
 * to CHECKED must give its box a VISIBLE `bg-accent-primary` fill — a non-transparent
 * background-color equal to the accent-primary token. Not a documented demo; this is a test-only
 * fixture.
 */
export const CheckedFillVisible: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: function Render() {
    const [checked, setChecked] = React.useState<Record<string, boolean>>({});
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>
          Priority
        </MenuTrigger>
        <MenuContent sizing="sm">
          {PRIORITIES.map((p) => (
            <MenuCheckboxItem
              key={p.key}
              icon={p.icon}
              checked={Boolean(checked[p.key])}
              onCheckedChange={(next) => setChecked((c) => ({ ...c, [p.key]: next }))}
              label={p.label}
            />
          ))}
        </MenuContent>
      </Menu>
    );
  },
  play: async ({ canvas, step }) => {
    await step("an unchecked row's box has no fill", async () => {
      await openMenu(canvas, "Priority");
      const high = (await waitFor(() => findItem("menuitemcheckbox", "High"))) as HTMLElement;
      await expect(high).toHaveAttribute("aria-checked", "false");
      // Sanity: before checking, the box really is transparent (no fill).
      await expect(isTransparent(checkboxBoxBgColor(high))).toBe(true);
    });

    await step("toggling to checked fills the box with the accent token", async () => {
      await userEvent.click(findItem("menuitemcheckbox", "High") as HTMLElement);
      await waitFor(() =>
        expect(findItem("menuitemcheckbox", "High")).toHaveAttribute("aria-checked", "true"),
      );

      // The fix: the checked box must paint a VISIBLE accent fill — not
      // transparent, and exactly the `bg-accent-primary` token. A regression
      // (dropping the base fill) would leave it transparent and fail here.
      // Re-query the row each read: Base UI re-renders the menu item on toggle,
      // so an old reference can go stale (a detached node reports no fill). Poll
      // inside `waitFor` to let the box's color transition settle.
      const accent = resolveAccentPrimary();
      // Equality with the (non-transparent) accent token implies a visible fill;
      // poll until the box's color transition settles to the accent.
      await waitFor(() =>
        expect(checkboxBoxBgColor(findItem("menuitemcheckbox", "High") as HTMLElement)).toBe(
          accent,
        ),
      );
      // Spell out the regression guard: the settled fill is explicitly NOT
      // transparent (the bug rendered a white check on a `rgba(...,0)` box).
      await expect(
        isTransparent(checkboxBoxBgColor(findItem("menuitemcheckbox", "High") as HTMLElement)),
      ).toBe(false);
    });
  },
};

/**
 * Demo 8 — **Filters**. Multi-select across several titled, collapsible sections (Priority, State,
 * Assignee, …). Each item carries a leading icon; a chevron on the heading collapses/expands the
 * category; categories are separated by a divider; and a long category previews only its first few
 * rows with a "View all" toggle that expands the remaining rows inline (and collapses back to "Show
 * less").
 */
export const Filters: Story = {
  render: function Render() {
    const [checked, setChecked] = React.useState<Record<string, boolean>>({});
    const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({});
    // Which `viewAll` sections have been expanded to show every row.
    const [expandedAll, setExpandedAll] = React.useState<Record<string, boolean>>({});
    const [query, setQuery] = React.useState("");
    const toggle = (key: string) => (next: boolean) => setChecked((c) => ({ ...c, [key]: next }));
    const match = (label: string) => label.toLowerCase().includes(query.toLowerCase());
    const sections = [
      {
        title: "Priority",
        items: PRIORITIES.map((p) => ({ key: `p-${p.key}`, label: p.label, icon: p.icon })),
      },
      {
        title: "State",
        items: STATUSES.map((s) => ({ key: `s-${s.key}`, label: s.label, icon: s.icon })),
      },
      {
        title: "Assignee",
        viewAll: true,
        items: ASSIGNEES.map((a) => ({
          key: `a-${a.key}`,
          label: a.name,
          icon: <Avatar magnitude="2xs" fallback={initials(a.name)} alt={a.name} />,
        })),
      },
    ];
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>
          Filters
        </MenuTrigger>
        <MenuContent
          sizing="sm"
          search={<MenuSearch value={query} onValueChange={setQuery} placeholder="Search" />}
        >
          {sections.map((section, index) => {
            const items = section.items.filter((i) => match(i.label));
            if (items.length === 0) return null;
            const isCollapsed = Boolean(collapsed[section.title]);
            const isExpandedAll = Boolean(expandedAll[section.title]);
            // A `viewAll` section previews only its first rows until expanded; the
            // toggle appears only when there are more rows than the preview shows.
            const hasOverflow = Boolean(section.viewAll) && items.length > VIEW_ALL_PREVIEW;
            const visibleItems =
              hasOverflow && !isExpandedAll ? items.slice(0, VIEW_ALL_PREVIEW) : items;
            return (
              <React.Fragment key={section.title}>
                {/* Divider between categories. */}
                {index > 0 ? <MenuSeparator /> : null}
                <MenuGroup>
                  {/* The category heading is itself a menuitem (valid `role="menu"`
                      child) so its collapse chevron stays interactive without breaking
                      ARIA. The label is the section title; the chevron is `endContent`. */}
                  <MenuItem
                    aria-expanded={!isCollapsed}
                    endContent={
                      isCollapsed ? (
                        <ChevronRight aria-hidden="true" />
                      ) : (
                        <ChevronDown aria-hidden="true" />
                      )
                    }
                    closeOnClick={false}
                    onClick={() => setCollapsed((c) => ({ ...c, [section.title]: !isCollapsed }))}
                    label={section.title}
                  />
                  {!isCollapsed
                    ? visibleItems.map((i) => (
                        <MenuCheckboxItem
                          key={i.key}
                          icon={i.icon}
                          checked={Boolean(checked[i.key])}
                          onCheckedChange={toggle(i.key)}
                          label={i.label}
                        />
                      ))
                    : null}
                  {/* "View all" is its own menuitem (keyboard-focusable like any row)
                      with link emphasis: no hover background + cursor-pointer. Clicking
                      it reveals the remaining rows inline; once expanded it becomes
                      "Show less". `aria-expanded` reflects the inline-expansion state. */}
                  {!isCollapsed && hasOverflow ? (
                    <MenuItem
                      aria-expanded={isExpandedAll}
                      closeOnClick={false}
                      onClick={() =>
                        setExpandedAll((s) => ({ ...s, [section.title]: !isExpandedAll }))
                      }
                      label={
                        <span className="text-accent-primary">
                          {isExpandedAll ? "Show less" : `View all (${items.length})`}
                        </span>
                      }
                    />
                  ) : null}
                </MenuGroup>
              </React.Fragment>
            );
          })}
        </MenuContent>
      </Menu>
    );
  },
};

export const FiltersInteraction: Story = {
  ...Filters,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("open and confirm multiple sections render", async () => {
      await openMenu(canvas, "Filters");
      await waitFor(() => expect(findItem("menuitemcheckbox", "Urgent")).toBeDefined());
      await expect(findItem("menuitemcheckbox", "Backlog")).toBeDefined();
      // The Assignee section previews only its first rows; later assignees are hidden
      // behind "View all" until it is activated.
      await expect(findItem("menuitemcheckbox", "Amelia Parker")).toBeDefined();
      await expect(findItem("menuitemcheckbox", "Ethan Parker")).toBeUndefined();
    });
    await step("View all expands the remaining rows inline", async () => {
      const viewAll = (await waitFor(() => findItem("menuitem", "View all"))) as HTMLElement;
      await expect(viewAll).toHaveAttribute("aria-expanded", "false");
      // Keyboard-accessible: activate the menuitem with Enter rather than a pointer.
      viewAll.focus();
      await userEvent.keyboard("{Enter}");
      await waitFor(() => expect(findItem("menuitemcheckbox", "Ethan Parker")).toBeDefined());
      // The toggle now offers to collapse again.
      const showLess = findItem("menuitem", "Show less") as HTMLElement;
      await expect(showLess).toHaveAttribute("aria-expanded", "true");
      await userEvent.click(showLess);
      await waitFor(() => expect(findItem("menuitemcheckbox", "Ethan Parker")).toBeUndefined());
    });
    await step("collapse a category from its heading", async () => {
      const heading = (await waitFor(() =>
        Array.from(document.body.querySelectorAll('[role="menuitem"]')).find(
          (el) =>
            el.getAttribute("aria-expanded") === "true" && el.textContent?.includes("Priority"),
        ),
      )) as HTMLElement;
      await userEvent.click(heading);
      await waitFor(() => expect(findItem("menuitemcheckbox", "Urgent")).toBeUndefined());
    });
  },
};

/**
 * Demo 9 — **EmptyState**. Searching filters the list; when nothing matches, the menu shows a "No
 * matching results" message instead of items. Rendered in an isolated iframe on the docs page
 * (`docs.story.inline: false`) — `defaultOpen` mounts the menu already open, and its outside-click
 * listener attaches to the whole document. Inline on a shared docs page, the first click anywhere
 * on that page (e.g. another story's trigger) gets consumed closing this menu instead of opening
 * the one actually clicked.
 */
export const EmptyState: Story = {
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
    // The empty state intentionally renders an open role="menu" whose only child is the
    // "No matching results" message — no menu items. axe's aria-required-children flags a
    // menu with no item children, but an empty results menu legitimately has none.
    a11y: { config: { rules: [{ id: "aria-required-children", enabled: false }] } },
  },
  render: function Render() {
    const [query, setQuery] = React.useState("Product");
    const visible = STATUSES.filter((s) => s.label.toLowerCase().includes(query.toLowerCase()));
    return (
      <Menu defaultOpen>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>Status</MenuTrigger>
        <MenuContent
          sizing="sm"
          search={<MenuSearch value={query} onValueChange={setQuery} placeholder="Search" />}
        >
          {visible.length > 0 ? (
            visible.map((s) => <MenuItem key={s.key} icon={s.icon} label={s.label} />)
          ) : (
            <div className="px-2 py-2 text-13 text-tertiary">No matching results</div>
          )}
        </MenuContent>
      </Menu>
    );
  },
};

export const EmptyStateInteraction: Story = {
  ...EmptyState,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ step }) => {
    await step("the no-results message shows for a non-matching query", async () => {
      await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
      await waitFor(() =>
        expect(document.body.textContent?.includes("No matching results")).toBe(true),
      );
    });
    await step("clearing the search restores the list", async () => {
      const search = document.body.querySelector('input[type="text"]') as HTMLInputElement;
      await userEvent.clear(search);
      await waitFor(() => expect(findItem("menuitem", "Backlog")).toBeDefined());
    });
  },
};

/**
 * Demo 10 — **Submenu**. Rows carry an `endContent` count `Badge` and a chevron; hovering one opens
 * a nested submenu of options (built on `MenuSubmenu`).
 */
export const Submenu: Story = {
  parameters: {
    a11y: {
      // When a submenu is open, Base UI's FloatingPortal emits a visually-hidden
      // `aria-owns` owner `<span>` next to the trigger. It reparents the portaled
      // submenu to the correct place in the accessibility tree (next to its trigger),
      // but in the DOM that span lands as a child of the parent `role="menu"`. axe's
      // aria-required-children reads the DOM tree rather than the a11y tree, so it
      // flags the span as a disallowed menu child. This is a static-analysis
      // false-positive on axe's side, not invalid markup (tracked at
      // dequelabs/axe-core#4048; the floating-ui maintainer confirmed the span is doing
      // correct a11y-tree placement in floating-ui/floating-ui#3424). Suppress just
      // this rule for this story.
      config: { rules: [{ id: "aria-required-children", enabled: false }] },
    },
  },
  render: () => (
    <Menu>
      <MenuTrigger render={<button type="button" className={triggerClass} />}>
        Filter by
      </MenuTrigger>
      <MenuContent sizing="sm">
        <MenuSubmenu>
          <MenuSubmenuTrigger
            endContent={<Badge magnitude="sm" tone="neutral" label="5" />}
            label="Priority"
          />
          <MenuSubmenuContent sizing="sm">
            {PRIORITIES.map((p) => (
              <MenuItem key={p.key} icon={p.icon} closeOnClick={false} label={p.label} />
            ))}
          </MenuSubmenuContent>
        </MenuSubmenu>
        <MenuSubmenu>
          <MenuSubmenuTrigger
            endContent={<Badge magnitude="sm" tone="neutral" label="5" />}
            label="State"
          />
          <MenuSubmenuContent sizing="sm">
            {STATUSES.map((s) => (
              <MenuItem key={s.key} icon={s.icon} closeOnClick={false} label={s.label} />
            ))}
          </MenuSubmenuContent>
        </MenuSubmenu>
        <MenuSubmenu>
          <MenuSubmenuTrigger
            endContent={<Badge magnitude="sm" tone="neutral" label="5" />}
            label="Assignee"
          />
          <MenuSubmenuContent sizing="sm">
            {ASSIGNEES.map((a) => (
              <MenuItem
                key={a.key}
                icon={<Avatar magnitude="2xs" fallback={initials(a.name)} alt={a.name} />}
                closeOnClick={false}
                label={a.name}
              />
            ))}
          </MenuSubmenuContent>
        </MenuSubmenu>
      </MenuContent>
    </Menu>
  ),
};

export const SubmenuInteraction: Story = {
  ...Submenu,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("open the menu and reveal a submenu", async () => {
      await openMenu(canvas, "Filter by");
      const priority = (await waitFor(() => findItem("menuitem", "Priority"))) as HTMLElement;
      await expect(priority).toHaveAttribute("aria-haspopup", "menu");
      await userEvent.click(priority);
      await waitFor(() =>
        expect(document.body.querySelectorAll('[role="menu"]').length).toBeGreaterThan(1),
      );
      await waitFor(() => expect(findItem("menuitem", "Urgent")).toBeDefined());
    });
  },
};

/**
 * **OpenOnHover**. The trigger's `openOnHover` prop (with an optional hover `delay`) opens the menu
 * from pointer hover as well as click/keyboard — for browse-style menus such as a quick-add.
 */
export const OpenOnHover: Story = {
  parameters: {
    a11y: {
      // While the hover-opened popup is up, axe flags Base UI's focus guards (aria-hidden spans
      // with tabindex=0 — floating-ui's standard focus-trap sentinels) as aria-hidden-focus
      // violations. Intentional library markup, so suppress just this rule (same precedent as
      // the menubar's aria-required-children suppression).
      config: { rules: [{ id: "aria-hidden-focus", enabled: false }] },
    },
  },
  render: () => (
    <Menu>
      <MenuTrigger
        openOnHover
        delay={100}
        render={<button type="button" className={triggerClass} />}
      >
        Quick add
      </MenuTrigger>
      <MenuContent sizing="sm">
        <MenuItem label="Work item" />
        <MenuItem label="Page" />
        <MenuItem label="Cycle" />
        <MenuItem label="Module" />
      </MenuContent>
    </Menu>
  ),
};

export const OpenOnHoverInteraction: Story = {
  ...OpenOnHover,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("hovering the trigger opens the menu", async () => {
      await userEvent.hover(canvas.getByRole("button", { name: "Quick add" }));
      await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
      await waitFor(() => expect(findItem("menuitem", "Page")).toBeDefined());
    });
  },
};

/**
 * **GroupLabels**. `MenuGroup` + `MenuLabel` title related items as non-interactive section
 * headings (each group is labelled by its heading for assistive tech); a `MenuSeparator` divides
 * the sections.
 */
export const GroupLabels: Story = {
  render: function Render() {
    const [sort, setSort] = React.useState("date");
    const [workspace, setWorkspace] = React.useState<Record<string, boolean>>({ sidebar: true });
    const sorts = [
      { key: "date", label: "Date created" },
      { key: "name", label: "Name" },
      { key: "type", label: "Type" },
    ];
    const panels = [
      { key: "minimap", label: "Minimap" },
      { key: "search", label: "Search" },
      { key: "sidebar", label: "Sidebar" },
    ];
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>View</MenuTrigger>
        <MenuContent sizing="sm">
          <MenuGroup>
            <MenuLabel>Sort</MenuLabel>
            {sorts.map((s) => (
              <MenuItem
                key={s.key}
                selected={sort === s.key}
                closeOnClick={false}
                onClick={() => setSort(s.key)}
                label={s.label}
              />
            ))}
          </MenuGroup>
          <MenuSeparator />
          <MenuGroup>
            <MenuLabel>Workspace</MenuLabel>
            {panels.map((p) => (
              <MenuCheckboxItem
                key={p.key}
                checked={Boolean(workspace[p.key])}
                onCheckedChange={(next) => setWorkspace((w) => ({ ...w, [p.key]: next }))}
                label={p.label}
              />
            ))}
          </MenuGroup>
        </MenuContent>
      </Menu>
    );
  },
};

export const GroupLabelsInteraction: Story = {
  ...GroupLabels,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("each group is labelled by its heading", async () => {
      await openMenu(canvas, "View");
      const groups = await waitFor(() => {
        const found = Array.from(document.body.querySelectorAll('[role="group"]'));
        if (found.length < 2) throw new Error("groups not mounted yet");
        return found;
      });
      const headings = groups.map((group) => {
        const labelId = group.getAttribute("aria-labelledby");
        return labelId != null ? document.getElementById(labelId)?.textContent : null;
      });
      await expect(headings).toContain("Sort");
      await expect(headings).toContain("Workspace");
    });
  },
};

// A handle created outside the React tree links a detached `MenuTrigger` to its `Menu` — the
// trigger can live anywhere in the DOM, no shared ancestor required.
const workItemActionsHandle = createMenuHandle();

/**
 * **DetachedTrigger**. `createMenuHandle` detaches the trigger from the menu tree: pass the same
 * handle to a `MenuTrigger` and to a `Menu` declared elsewhere, and the trigger drives it as if
 * they were nested.
 */
export const DetachedTrigger: Story = {
  render: () => (
    <>
      <MenuTrigger
        handle={workItemActionsHandle}
        render={<button type="button" className={triggerClass} />}
      >
        Work item actions
      </MenuTrigger>
      <Menu handle={workItemActionsHandle}>
        <MenuContent sizing="sm">
          <MenuItem icon={<Icon icon={Pencil} tint="secondary" />} label="Edit" />
          <MenuItem icon={<Icon icon={Copy} tint="secondary" />} label="Make a copy" />
          <MenuSeparator />
          <MenuItem tone="danger" icon={<Icon icon={Trash2} />} label="Delete" />
        </MenuContent>
      </Menu>
    </>
  ),
};

export const DetachedTriggerInteraction: Story = {
  ...DetachedTrigger,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("the detached trigger opens the handle's menu", async () => {
      await openMenu(canvas, "Work item actions");
      await waitFor(() => expect(findItem("menuitem", "Edit")).toBeDefined());
    });
    await step("Escape closes it again", async () => {
      await userEvent.keyboard("{Escape}");
      await waitFor(() =>
        expect(document.body.querySelector('[role="menu"]')).not.toBeInTheDocument(),
      );
    });
  },
};

// One shared handle: several triggers open the same menu surface, each passing its own typed
// payload; the `Menu`'s function-children receive the active trigger's payload.
const commandMenuHandle = createMenuHandle<ReadonlyArray<string>>();

const COMMAND_SECTIONS = {
  file: ["New work item", "New page", "Import"],
  edit: ["Undo", "Redo", "Duplicate"],
} as const;

/**
 * **MultipleTriggers**. Several `MenuTrigger`s share one `Menu` through a typed handle; each
 * trigger passes a `payload`, and the menu's function-children render whichever trigger opened it.
 * `MenuViewport` lets the popup morph its size when the payload swaps while open.
 */
export const MultipleTriggers: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <MenuTrigger
        handle={commandMenuHandle}
        payload={COMMAND_SECTIONS.file}
        render={<button type="button" className={triggerClass} />}
      >
        File
      </MenuTrigger>
      <MenuTrigger
        handle={commandMenuHandle}
        payload={COMMAND_SECTIONS.edit}
        render={<button type="button" className={triggerClass} />}
      >
        Edit
      </MenuTrigger>
      <Menu handle={commandMenuHandle}>
        {({ payload }) => (
          <MenuContent sizing="sm">
            <MenuViewport>
              {(payload ?? []).map((command) => (
                <MenuItem key={command} label={command} />
              ))}
            </MenuViewport>
          </MenuContent>
        )}
      </Menu>
    </div>
  ),
};

export const MultipleTriggersInteraction: Story = {
  ...MultipleTriggers,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, step }) => {
    await step("the File trigger opens the menu with its payload", async () => {
      await openMenu(canvas, "File");
      await waitFor(() => expect(findItem("menuitem", "New work item")).toBeDefined());
      await expect(findItem("menuitem", "Undo")).toBeUndefined();
    });
    await step("the Edit trigger swaps the payload", async () => {
      await userEvent.keyboard("{Escape}");
      await waitFor(() =>
        expect(document.body.querySelector('[role="menu"]')).not.toBeInTheDocument(),
      );
      await openMenu(canvas, "Edit");
      await waitFor(() => expect(findItem("menuitem", "Undo")).toBeDefined());
      await expect(findItem("menuitem", "New work item")).toBeUndefined();
    });
  },
};

// Controlled mode across multiple detached triggers (test-only fixture — the visible payload demo
// is `MultipleTriggers`): `open` + `onOpenChange` hold the state outside the menu, and `triggerId`
// tells it which trigger owns the surface; `eventDetails.trigger` identifies the trigger that
// asked to open.
const controlledMenuHandle = createMenuHandle<string>();

/**
 * Controlled `open`/`onOpenChange` with `triggerId` routing across multiple triggers. Not a
 * documented demo; this is a test-only fixture.
 */
export const ControlledMultipleTriggers: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: function Render() {
    const [open, setOpen] = React.useState(false);
    const [activeTriggerId, setActiveTriggerId] = React.useState<string | null>(null);
    return (
      <div className="flex items-center gap-2">
        <MenuTrigger
          handle={controlledMenuHandle}
          id="controlled-menu-file"
          payload="File"
          render={<button type="button" className={triggerClass} />}
        >
          File
        </MenuTrigger>
        <MenuTrigger
          handle={controlledMenuHandle}
          id="controlled-menu-edit"
          payload="Edit"
          render={<button type="button" className={triggerClass} />}
        >
          Edit
        </MenuTrigger>
        <Menu
          handle={controlledMenuHandle}
          open={open}
          triggerId={activeTriggerId}
          onOpenChange={(nextOpen, eventDetails) => {
            setOpen(nextOpen);
            setActiveTriggerId(nextOpen ? (eventDetails.trigger?.id ?? null) : null);
          }}
        >
          {({ payload }) => (
            <MenuContent sizing="sm">
              <MenuItem label={`${payload ?? ""} action`} />
            </MenuContent>
          )}
        </Menu>
      </div>
    );
  },
  play: async ({ canvas, step }) => {
    await step("clicking a trigger routes controlled open state through it", async () => {
      await openMenu(canvas, "Edit");
      // The handle routes the pressed trigger's payload into the popup — the menu shows the
      // Edit actions, not the File ones.
      await waitFor(() => expect(findItem("menuitem", "Edit action")).toBeDefined());
      await expect(findItem("menuitem", "File action")).toBeUndefined();
    });
    await step("Escape closes through onOpenChange", async () => {
      await userEvent.keyboard("{Escape}");
      await waitFor(() =>
        expect(document.body.querySelector('[role="menu"]')).not.toBeInTheDocument(),
      );
    });
  },
};

/**
 * Single-select radio rows: `MenuRadioGroup` carries the `value`, and each `MenuRadioItem` shows a
 * kept-mounted radio dot that follows the selection.
 */
export const RadioRows: Story = {
  render: function Render(args) {
    const [density, setDensity] = React.useState("comfortable");
    void args;
    return (
      <Menu>
        <MenuTrigger render={<button type="button" className={triggerClass} />}>
          Density
        </MenuTrigger>
        <MenuContent sizing="sm">
          <MenuRadioGroup value={density} onValueChange={setDensity}>
            <MenuRadioItem value="comfortable" closeOnClick={false} label="Comfortable" />
            <MenuRadioItem value="compact" closeOnClick={false} label="Compact" />
          </MenuRadioGroup>
        </MenuContent>
      </Menu>
    );
  },
};

/**
 * Interaction test: rows expose `menuitemradio`, and picking one moves `aria-checked`. Tagged out
 * of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const RadioRowsInteraction: Story = {
  ...RadioRows,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await openMenu(canvas, "Density");
    const comfortable = await within(document.body).findByRole("menuitemradio", {
      name: "Comfortable",
    });
    await expect(comfortable).toHaveAttribute("aria-checked", "true");
    await userEvent.click(within(document.body).getByRole("menuitemradio", { name: "Compact" }));
    await expect(
      within(document.body).getByRole("menuitemradio", { name: "Compact" }),
    ).toHaveAttribute("aria-checked", "true");
    await expect(comfortable).toHaveAttribute("aria-checked", "false");
  },
};
